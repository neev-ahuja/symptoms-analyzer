import { Heart, Activity, Brain, Leaf, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">HealthAnalyzer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="text-green-600 hover:text-green-700 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/analyzer"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>


      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Understand Your Health
            <span className="gradient-text"> Better</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized health insights based on your lifestyle, medical history, and current health metrics. 
            Our AI-powered analyzer provides actionable recommendations for better health outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/analyzer"
              className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg inline-flex items-center justify-center"
            >
              Start Health Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/dashboard"
              className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-all duration-200 transform hover:scale-[1.02] shadow-lg inline-flex items-center justify-center"
            >
              View Dashboard
              <Activity className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-green-100 health-card">
            <Activity className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
            <p className="text-gray-600">Analyze multiple health factors including BMI, blood glucose, lifestyle habits, and environmental factors.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-green-100 health-card">
            <Brain className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">Get personalized health recommendations based on your unique profile and risk factors.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-green-100 health-card">
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Preventive Care</h3>
            <p className="text-gray-600">Focus on prevention with early detection of potential health risks and lifestyle improvements.</p>
          </div>
        </div>
      </section>


      <footer className="bg-white border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 HealthAnalyzer</p>
          </div>
        </div>
      </footer>
    </div>
);

export default LandingPage;