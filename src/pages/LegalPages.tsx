export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            At Vortex Care Support LTD, we collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Personal identification information (name, email address, phone number, date of birth)</li>
            <li>Medical history and health information</li>
            <li>Insurance information</li>
            <li>Appointment and treatment records</li>
            <li>Payment and billing information</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Provide, maintain, and improve our healthcare services</li>
            <li>Process appointments and communicate with you about your care</li>
            <li>Send you appointment reminders and health-related information</li>
            <li>Process payments and insurance claims</li>
            <li>Comply with legal obligations and healthcare regulations</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
          <p className="text-gray-600 mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Healthcare providers involved in your care</li>
            <li>Insurance companies for claims processing</li>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate technical and organizational measures to protect your personal information, 
            including encryption, access controls, and regular security assessments.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Access your personal information</li>
            <li>Request corrections to your data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of certain communications</li>
            <li>Request a copy of your health records</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
          <p className="text-gray-600">
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@vortexcare.com" className="text-blue-600 hover:text-blue-700">
              privacy@vortexcare.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing and using the Vortex Care Support LTD website and services, you agree to be bound by 
            these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Services Description</h2>
          <p className="text-gray-600 mb-4">
            Vortex Care Support LTD provides healthcare services including but not limited to primary care, 
            specialist consultations, preventive screenings, and telehealth services. Our services are subject 
            to availability and applicable medical guidelines.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
          <p className="text-gray-600 mb-4">You agree to:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of your account</li>
            <li>Notify us of any unauthorized access</li>
            <li>Use the services only for lawful purposes</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Appointments and Cancellations</h2>
          <p className="text-gray-600 mb-4">
            Appointments can be scheduled, rescheduled, or cancelled through our online portal or by contacting 
            our office. We request at least 24 hours notice for cancellations. Repeated no-shows may result in 
            restrictions on booking future appointments.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Payment and Insurance</h2>
          <p className="text-gray-600 mb-4">
            Payment is due at the time of service unless prior arrangements have been made. We accept various 
            insurance plans and will assist with claims processing. You are responsible for any amounts not 
            covered by insurance.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-600 mb-4">
            While we strive to provide the highest quality care, Vortex Care Support LTD shall not be liable 
            for any indirect, incidental, or consequential damages arising from the use of our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Changes to Terms</h2>
          <p className="text-gray-600 mb-4">
            We reserve the right to modify these terms at any time. Changes will be effective upon posting to 
            our website. Continued use of our services constitutes acceptance of the modified terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export function HIPAACompliancePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">HIPAA Compliance Statement</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">
            Vortex Care Support LTD is committed to protecting the privacy and security of your protected 
            health information (PHI) in compliance with the Health Insurance Portability and Accountability 
            Act (HIPAA) of 1996.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Commitment</h2>
          <p className="text-gray-600 mb-4">We maintain comprehensive policies and procedures to ensure:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Administrative safeguards including workforce training and security management</li>
            <li>Physical safeguards protecting our facilities and equipment</li>
            <li>Technical safeguards including encryption and access controls</li>
            <li>Regular risk assessments and compliance audits</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights Under HIPAA</h2>
          <p className="text-gray-600 mb-4">As a patient, you have the right to:</p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Access and obtain copies of your medical records</li>
            <li>Request amendments to your health information</li>
            <li>Receive an accounting of disclosures of your PHI</li>
            <li>Request restrictions on certain uses of your information</li>
            <li>Receive confidential communications about your health information</li>
            <li>File a complaint if you believe your privacy rights have been violated</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Breach Notification</h2>
          <p className="text-gray-600 mb-4">
            In the unlikely event of a breach of unsecured PHI, we will notify affected individuals, the 
            Department of Health and Human Services, and if applicable, the media, in accordance with HIPAA 
            breach notification requirements.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Our Privacy Officer</h2>
          <p className="text-gray-600">
            For questions about our HIPAA compliance or to exercise your rights, please contact our Privacy 
            Officer at{' '}
            <a href="mailto:hipaa@vortexcare.com" className="text-blue-600 hover:text-blue-700">
              hipaa@vortexcare.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
