'use client';
import { useState, useRef } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [suggestedPassword, setSuggestedPassword] = useState('');
  const hasGenerated = useRef(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generatePassword = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          length: 16,
          includeSymbols: true
        })
      });
      
      const data = await res.json();
      setSuggestedPassword(data.password);
      hasGenerated.current = true;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordFocus = () => {
    if (!hasGenerated.current && !formData.password) {
      generatePassword();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        dob: '',
        gender: '',
        password: ''
      });
      setSuggestedPassword('');
      hasGenerated.current = false;
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8 border border-purple-500/20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <img
                src="/cosmic-auth.png"
                alt="Cosmic Auth Logo"
                width={48}
                height={48}
                className="bg-transparent"
                style={{ background: 'transparent' }}
              />
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
                Cosmic Auth
              </h1>
            </div>
            <p className="text-gray-400">Secure password generation using SpaceComputer cTRNG</p>
          </div>
          
          {showSuccess ? (
            <div className="text-center text-purple-500 text-xl font-semibold">
              Sign up successful! 🎉
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2.5 px-3"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2.5 px-3"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2.5 px-3"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1.5">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2.5 px-3"
                >
                  <option value="" className="text-gray-400">Select gender</option>
                  <option value="male" className="text-white">Male</option>
                  <option value="female" className="text-white">Female</option>
                  <option value="other" className="text-white">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                <div className="mt-1 relative flex items-center">
                  <input
                    type="text"
                    name="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={handlePasswordFocus}
                    className="block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2.5 px-3 pr-10"
                  />
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-purple-500 focus:outline-none disabled:opacity-50"
                    title="Generate new password"
                    tabIndex={-1}
                    disabled={loading}
                  >
                    <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                {suggestedPassword && (
                  <div className="mt-2 p-3 bg-gray-800 rounded-md border border-purple-500/20">
                    <p className="text-sm text-gray-300">Suggested password:</p>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <code className="text-sm font-mono text-purple-400">{suggestedPassword}</code>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, password: suggestedPassword });
                          setSuggestedPassword('');
                        }}
                        className="text-sm text-purple-500 hover:text-purple-400"
                      >
                        Use this
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-600"
              >
                {loading ? 'Generating...' : 'Sign Up'}
              </button>
            </form>
          )}
        </div>
        
        <div className="text-center mt-6">
          <a 
            href="https://github.com/deeakpan/cosmic-auth" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            github.com/deeakpan/cosmic-auth
          </a>
        </div>
      </div>
    </div>
  );
}
