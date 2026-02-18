import { useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDataStore } from '@/store/dataStore';
import { ArrowLeft, CheckCircle, AlertCircle, Upload, X, FileText } from 'lucide-react';

const applicationSchema = z.object({
  applicantName: z.string().min(2, 'Name is required'),
  applicantEmail: z.string().email('Invalid email address'),
  applicantPhone: z.string().min(10, 'Valid phone number is required'),
  yearsOfExperience: z.number().min(0, 'Years of experience is required'),
  qualifications: z.string().min(10, 'Please describe your qualifications'),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
  resume: z.string().min(10, 'Resume/CV is required'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface FileUpload {
  name: string;
  size: number;
  type: string;
  base64: string;
}

export function JobApplicationPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobPositions, addJobApplication } = useDataStore();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [cvFile, setCvFile] = useState<FileUpload | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<FileUpload | null>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);

  const job = jobPositions.find(p => p.id === jobId);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Position Not Found</h1>
          <p className="text-gray-600 mb-6">The job position you're looking for doesn't exist.</p>
          <Link to="/jobs" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">
            <ArrowLeft size={20} />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isCV: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Allowed file types
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    
    if (!allowedTypes.includes(file.type)) {
      setError('File type not supported. Please upload PDF, Word, Text, or Excel files.');
      return;
    }

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const fileData: FileUpload = {
        name: file.name,
        size: file.size,
        type: file.type,
        base64: base64,
      };

      if (isCV) {
        setCvFile(fileData);
      } else {
        setCoverLetterFile(fileData);
      }
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setError('');
    try {
      addJobApplication({
        jobPositionId: job.id,
        jobTitle: job.title,
        applicantName: data.applicantName,
        applicantEmail: data.applicantEmail,
        applicantPhone: data.applicantPhone,
        resume: data.resume,
        coverLetter: data.coverLetter,
        qualifications: data.qualifications,
        yearsOfExperience: data.yearsOfExperience,
        cvFile: cvFile || undefined,
        coverLetterFile: coverLetterFile || undefined,
        status: 'submitted',
      });
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for applying for the {job.title} position. We'll review your application and contact you soon.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            A confirmation has been sent to your email address, and a notification has been sent to our admin team.
          </p>
          <div className="space-y-3">
            <Link
              to="/jobs"
              className="block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Browse More Positions
            </Link>
            <Link
              to="/"
              className="block px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/jobs" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6">
          <ArrowLeft size={20} />
          Back to Jobs
        </Link>

        {/* Job Details */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <span>{job.location}</span>
            <span>•</span>
            <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
            <span>•</span>
            <span>£{job.salary.min.toLocaleString()} - £{job.salary.max.toLocaleString()}</span>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply Now</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    {...register('applicantName')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="John Doe"
                  />
                  {errors.applicantName && <p className="text-red-500 text-sm mt-1">{errors.applicantName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    {...register('applicantEmail')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="john@example.com"
                  />
                  {errors.applicantEmail && <p className="text-red-500 text-sm mt-1">{errors.applicantEmail.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  {...register('applicantPhone')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="+44 (0)20 1234 5678"
                />
                {errors.applicantPhone && <p className="text-red-500 text-sm mt-1">{errors.applicantPhone.message}</p>}
              </div>
            </div>

            {/* Experience */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                <input
                  type="number"
                  {...register('yearsOfExperience', { valueAsNumber: true })}
                  min="0"
                  max="70"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="5"
                />
                {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience.message}</p>}
              </div>
            </div>

            {/* Qualifications */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications & Skills</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Qualifications *</label>
                <textarea
                  {...register('qualifications')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Describe your relevant qualifications, certifications, and skills..."
                />
                {errors.qualifications && <p className="text-red-500 text-sm mt-1">{errors.qualifications.message}</p>}
              </div>
            </div>

            {/* Application Documents */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume & Cover Letter</h3>
              
              {/* CV Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV/Resume * (PDF, Word, Text)</label>
                <div className="space-y-3">
                  {cvFile ? (
                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="text-emerald-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{cvFile.name}</p>
                          <p className="text-xs text-gray-600">{(cvFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCvFile(null)}
                        className="text-emerald-600 hover:text-emerald-800"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => cvInputRef.current?.click()}
                      className="w-full px-4 py-6 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload size={20} className="text-blue-600" />
                      <span className="text-blue-600 font-medium">Click to upload CV or drag and drop</span>
                    </button>
                  )}
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500">Maximum file size: 10MB. Supported formats: PDF, Word, Text, Excel</p>
                </div>
              </div>

              {/* Resume Text Fallback */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Or Paste Resume Content *</label>
                <textarea
                  {...register('resume')}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                  placeholder="If you prefer, paste your resume content here..."
                />
                {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>}
              </div>

              {/* Cover Letter Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Cover Letter (PDF, Word, Text)</label>
                <div className="space-y-3">
                  {coverLetterFile ? (
                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="text-emerald-600" size={20} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{coverLetterFile.name}</p>
                          <p className="text-xs text-gray-600">{(coverLetterFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCoverLetterFile(null)}
                        className="text-emerald-600 hover:text-emerald-800"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => coverLetterInputRef.current?.click()}
                      className="w-full px-4 py-6 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Upload size={20} className="text-blue-600" />
                      <span className="text-blue-600 font-medium">Click to upload Cover Letter or drag and drop</span>
                    </button>
                  )}
                  <input
                    ref={coverLetterInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                    onChange={(e) => handleFileUpload(e, false)}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500">Optional. Maximum file size: 10MB. Supported formats: PDF, Word, Text, Excel</p>
                </div>
              </div>

              {/* Cover Letter Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter *</label>
                <textarea
                  {...register('coverLetter')}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                />
                {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <Link
                to="/jobs"
                className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </Link>
            </div>

            <p className="text-xs text-gray-500 text-center">
              By submitting this application, you agree to our terms and conditions. Your documents and information will be reviewed by our admin team.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
