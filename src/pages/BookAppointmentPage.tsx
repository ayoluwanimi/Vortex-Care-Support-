import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDataStore } from '@/store/dataStore';
import { useAuthStore } from '@/store/authStore';
import { Calendar, Clock, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { format, addDays } from 'date-fns';

const appointmentSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  serviceId: z.string().min(1, 'Please select a service'),
  appointmentDate: z.string().min(1, 'Please select a date'),
  appointmentTime: z.string().min(1, 'Please select a time'),
  reason: z.string().min(10, 'Please describe your reason for visit'),
  medicalHistory: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { services, appointments, addAppointment, addPatient } = useDataStore();
  const { user, isAuthenticated } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  const activeServices = services.filter(s => s.isActive);
  const preselectedService = searchParams.get('service');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      serviceId: preselectedService || '',
      gender: 'prefer_not_to_say',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });

  const selectedDate = watch('appointmentDate');
  const selectedService = watch('serviceId');

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return timeSlots;
    
    const bookedTimes = appointments
      .filter(a => a.appointmentDate === selectedDate && a.status !== 'cancelled')
      .map(a => a.appointmentTime);
    
    return timeSlots.filter(time => !bookedTimes.includes(time));
  };

  const availableTimeSlots = getAvailableTimeSlots();

  // Generate next 30 days for date selection
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    // Skip Sundays
    if (date.getDay() === 0) return null;
    return format(date, 'yyyy-MM-dd');
  }).filter(Boolean) as string[];

  const onSubmit = (data: AppointmentFormData) => {
    const service = services.find(s => s.id === data.serviceId);
    
    // Create patient record
    const patient = addPatient({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: { street: '', city: '', state: '', zipCode: '', country: '' },
      emergencyContact: { name: '', relationship: '', phone: '' },
      insuranceInfo: {
        provider: data.insuranceProvider || '',
        policyNumber: data.insurancePolicyNumber || '',
        groupNumber: '',
      },
      medicalHistory: data.medicalHistory || '',
      allergies: [],
      currentMedications: [],
    });

    // Create appointment
    const appointment = addAppointment({
      patientId: patient.id,
      patientName: `${data.firstName} ${data.lastName}`,
      patientEmail: data.email,
      patientPhone: data.phone,
      serviceId: data.serviceId,
      serviceName: service?.name || '',
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      duration: service?.duration || 30,
      status: 'pending',
      reason: data.reason,
      reminderSent: false,
    });

    setBookedAppointment(appointment);
    setIsSubmitted(true);
  };

  if (isSubmitted && bookedAppointment) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Appointment Booked!</h1>
            <p className="text-gray-600 mb-8">
              Your appointment has been successfully scheduled. We've sent a confirmation to your email.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Service:</span>
                  <span className="font-medium">{bookedAppointment.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">{format(new Date(bookedAppointment.appointmentDate), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium">{bookedAppointment.appointmentTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium capitalize">
                    {bookedAppointment.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Confirmation #:</span>
                  <span className="font-medium font-mono">{bookedAppointment.id.slice(-8).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                Return Home
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => navigate('/patient-portal')}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  View in Portal
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s < step ? 'bg-emerald-500 text-white' :
                  s === step ? 'bg-blue-600 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {s < step ? <CheckCircle size={20} /> : s}
                </div>
                {s < 4 && (
                  <div className={`w-12 md:w-24 h-1 mx-2 ${s < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500 max-w-lg mx-auto">
            <span>Service</span>
            <span>Date & Time</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Service</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {activeServices.map(service => (
                    <label
                      key={service.id}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedService === service.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        value={service.id}
                        {...register('serviceId')}
                        className="hidden"
                      />
                      <div className="flex items-start gap-4">
                        <img
                          src={service.featuredImage}
                          alt={service.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-500">{service.duration} mins</p>
                          <p className="font-semibold text-blue-600">${service.price}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.serviceId && (
                  <p className="text-red-500 text-sm mt-2">{errors.serviceId.message}</p>
                )}
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    Select Date
                  </label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                    {availableDates.slice(0, 14).map(date => (
                      <label
                        key={date}
                        className={`p-3 text-center border-2 rounded-lg cursor-pointer transition-all ${
                          selectedDate === date
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          value={date}
                          {...register('appointmentDate')}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500">{format(new Date(date), 'EEE')}</p>
                        <p className="font-semibold">{format(new Date(date), 'd')}</p>
                        <p className="text-xs text-gray-500">{format(new Date(date), 'MMM')}</p>
                      </label>
                    ))}
                  </div>
                  {errors.appointmentDate && (
                    <p className="text-red-500 text-sm mt-2">{errors.appointmentDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline-block w-4 h-4 mr-1" />
                    Select Time
                  </label>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {availableTimeSlots.map(time => (
                      <label
                        key={time}
                        className={`p-3 text-center border-2 rounded-lg cursor-pointer transition-all ${
                          watch('appointmentTime') === time
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          value={time}
                          {...register('appointmentTime')}
                          className="hidden"
                        />
                        <span className="font-medium">{time}</span>
                      </label>
                    ))}
                  </div>
                  {availableTimeSlots.length === 0 && (
                    <p className="text-orange-500 text-sm mt-2">No available time slots for this date. Please select another date.</p>
                  )}
                  {errors.appointmentTime && (
                    <p className="text-red-500 text-sm mt-2">{errors.appointmentTime.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      {...register('firstName')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      {...register('dateOfBirth')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                    <select
                      {...register('gender')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="prefer_not_to_say">Prefer not to say</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
                  <textarea
                    {...register('reason')}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Please describe your symptoms or reason for this appointment..."
                  />
                  {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medical History (Optional)</label>
                  <textarea
                    {...register('medicalHistory')}
                    rows={2}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Any relevant medical history, allergies, or current medications..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider (Optional)</label>
                    <input
                      type="text"
                      {...register('insuranceProvider')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number (Optional)</label>
                    <input
                      type="text"
                      {...register('insurancePolicyNumber')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Appointment</h2>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Appointment Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium">{services.find(s => s.id === watch('serviceId'))?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">
                        {watch('appointmentDate') && format(new Date(watch('appointmentDate')), 'MMMM d, yyyy')} at {watch('appointmentTime')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Patient Name</p>
                      <p className="font-medium">{watch('firstName')} {watch('lastName')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{watch('email')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{watch('phone')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium text-blue-600">${services.find(s => s.id === watch('serviceId'))?.price}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                  <p className="font-medium mb-2">Please note:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>A confirmation email will be sent to your email address</li>
                    <li>Please arrive 15 minutes before your scheduled appointment</li>
                    <li>Bring a valid ID and insurance card if applicable</li>
                    <li>You can reschedule or cancel up to 24 hours before the appointment</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              ) : (
                <div />
              )}
              
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !selectedService) ||
                    (step === 2 && (!watch('appointmentDate') || !watch('appointmentTime')))
                  }
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <CheckCircle size={20} />
                  Confirm Appointment
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
