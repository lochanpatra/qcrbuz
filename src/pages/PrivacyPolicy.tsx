import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: July 2025</p>

      <p>
        Your privacy is important to us. This Privacy Policy explains how we collect, use,
        and protect your information when you use our website.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Personal information you provide when signing up or contacting us.</li>
        <li>Data collected automatically via cookies and analytics tools.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your data to improve our services, communicate with you, and ensure a better experience.</p>

      <h2>Cookies</h2>
      <p>We use cookies to enhance site functionality and track usage patterns.</p>

      <h2>Your Rights</h2>
      <p>You may request access to, correction, or deletion of your personal information.</p>

      <h2>Contact Us</h2>
      <p>If you have questions about this policy, contact us at contact form.</p>
    </div>
  );
};

export default PrivacyPolicy;
