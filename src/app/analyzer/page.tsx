'use client';
import { useState } from 'react';
import { AlertCircle, CheckCircle, TrendingUp, User, Heart, Activity, Shield, Target, Zap, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserData {
    age: number;
    gender: string;
    bmi: number;
    smoking: number;
    alcohol_consumption: number;
    physical_activity: number;
    diet_score: number;
    stress_level: number;
    air_pollution_exposure: number;
    blood_glucose_level: number;
    hba1c_level: number;
}

interface PredictionResult {
    diabetes_risk: number;
    heart_attack_risk: number;
    hypertension_risk: number;
    diabetes: number;
    hypertension: number;
    heart_disease: number;
    obesity: number;
}

const defaultUserData: UserData = {
    age: 42,
    gender: "female",
    bmi: 27.3,
    smoking: 1,
    alcohol_consumption: 1,
    physical_activity: 1,
    diet_score: 6,
    stress_level: 4,
    air_pollution_exposure: 9,
    blood_glucose_level: 145,
    hba1c_level: 6.1
};

const cities = [
    { name: 'Delhi', pollution: 9 },
    { name: 'Mumbai', pollution: 7 },
    { name: 'Bangalore', pollution: 6 },
    { name: 'Chennai', pollution: 6 },
    { name: 'Kolkata', pollution: 8 },
    { name: 'Hyderabad', pollution: 5 },
    { name: 'Pune', pollution: 5 },
    { name: 'Ahmedabad', pollution: 7 },
    { name: 'Jaipur', pollution: 6 },
    { name: 'Lucknow', pollution: 8 },
    { name: 'Kanpur', pollution: 9 },
    { name: 'Nagpur', pollution: 6 },
    { name: 'Indore', pollution: 5 },
    { name: 'Thane', pollution: 7 },
    { name: 'Bhopal', pollution: 5 },
    { name: 'Visakhapatnam', pollution: 4 },
    { name: 'Pimpri-Chinchwad', pollution: 5 },
    { name: 'Patna', pollution: 8 },
    { name: 'Vadodara', pollution: 6 },
    { name: 'Ghaziabad', pollution: 9 },
    { name: 'Ludhiana', pollution: 7 },
    { name: 'Agra', pollution: 8 },
    { name: 'Nashik', pollution: 5 },
    { name: 'Faridabad', pollution: 8 },
    { name: 'Meerut', pollution: 8 },
    { name: 'Rajkot', pollution: 6 },
    { name: 'Kalyan-Dombivali', pollution: 7 },
    { name: 'Vasai-Virar', pollution: 6 },
    { name: 'Varanasi', pollution: 7 },
    { name: 'Srinagar', pollution: 3 },
    { name: 'Aurangabad', pollution: 5 },
    { name: 'Dhanbad', pollution: 7 },
    { name: 'Amritsar', pollution: 6 },
    { name: 'Navi Mumbai', pollution: 6 },
    { name: 'Allahabad', pollution: 7 },
    { name: 'Ranchi', pollution: 5 },
    { name: 'Howrah', pollution: 8 },
    { name: 'Coimbatore', pollution: 4 },
    { name: 'Jabalpur', pollution: 5 },
    { name: 'Gwalior', pollution: 6 },
    { name: 'Vijayawada', pollution: 5 },
    { name: 'Jodhpur', pollution: 6 },
    { name: 'Madurai', pollution: 4 },
    { name: 'Raipur', pollution: 5 },
    { name: 'Kota', pollution: 6 },
    { name: 'Guwahati', pollution: 4 },
    { name: 'Chandigarh', pollution: 5 },
    { name: 'Solapur', pollution: 5 },
    { name: 'Hubballi-Dharwad', pollution: 4 },
    { name: 'Tiruchirappalli', pollution: 4 },
    { name: 'Bareilly', pollution: 7 },
    { name: 'Mysore', pollution: 3 },
    { name: 'Tiruppur', pollution: 4 },
    { name: 'Gurgaon', pollution: 8 },
    { name: 'Aligarh', pollution: 7 },
    { name: 'Jalandhar', pollution: 6 },
    { name: 'Bhubaneswar', pollution: 4 },
    { name: 'Salem', pollution: 4 },
    { name: 'Mira-Bhayandar', pollution: 6 },
    { name: 'Warangal', pollution: 4 },
    { name: 'Thiruvananthapuram', pollution: 3 },
    { name: 'Guntur', pollution: 5 },
    { name: 'Bhiwandi', pollution: 7 },
    { name: 'Saharanpur', pollution: 7 },
    { name: 'Gorakhpur', pollution: 7 },
    { name: 'Bikaner', pollution: 5 },
    { name: 'Amravati', pollution: 5 },
    { name: 'Noida', pollution: 8 },
    { name: 'Jamshedpur', pollution: 6 },
    { name: 'Bhilai Nagar', pollution: 6 },
    { name: 'Cuttack', pollution: 5 },
    { name: 'Firozabad', pollution: 7 },
    { name: 'Kochi', pollution: 3 },
    { name: 'Nellore', pollution: 4 },
    { name: 'Bhavnagar', pollution: 5 },
    { name: 'Dehradun', pollution: 4 },
    { name: 'Durgapur', pollution: 6 },
    { name: 'Asansol', pollution: 7 },
    { name: 'Rourkela', pollution: 6 },
    { name: 'Nanded', pollution: 4 },
    { name: 'Kolhapur', pollution: 4 },
    { name: 'Ajmer', pollution: 5 },
    { name: 'Akola', pollution: 5 },
    { name: 'Gulbarga', pollution: 4 },
    { name: 'Jamnagar', pollution: 5 },
    { name: 'Ujjain', pollution: 5 },
    { name: 'Loni', pollution: 8 },
    { name: 'Siliguri', pollution: 5 },
    { name: 'Jhansi', pollution: 6 },
    { name: 'Ulhasnagar', pollution: 7 },
    { name: 'Jammu', pollution: 4 },
    { name: 'Sangli-Miraj & Kupwad', pollution: 4 },
    { name: 'Mangalore', pollution: 3 },
    { name: 'Erode', pollution: 4 },
    { name: 'Belgaum', pollution: 4 },
    { name: 'Ambattur', pollution: 5 },
    { name: 'Tirunelveli', pollution: 3 },
    { name: 'Malegaon', pollution: 5 },
    { name: 'Gaya', pollution: 6 },
    { name: 'Jalgaon', pollution: 5 },
    { name: 'Udaipur', pollution: 4 },
    { name: 'Maheshtala', pollution: 7 }
];

const AnalyzerPage = () => {
    const [userData, setUserData] = useState<UserData>(defaultUserData);
    const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const router = useRouter();

    const analyzeHealth = async () => {
        setIsAnalyzing(true);
        
        try {
            const response = await fetch('https://symptom-analyzer-m5gj.onrender.com/predict/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to get prediction');
            }

            const result = await response.json();
            setPredictionResult(result);
            
            
            const encodedData = encodeURIComponent(JSON.stringify(result));
            router.push(`/results?data=${encodedData}`);
        } catch (error) {
            console.error('Error analyzing health:', error);
            
            const mockPrediction: PredictionResult = {
                diabetes_risk: 0,
                heart_attack_risk: 0,
                hypertension_risk: 1,
                diabetes: 0,
                hypertension: 0,
                heart_disease: 0,
                obesity: 0
            };
            setPredictionResult(mockPrediction);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleInputChange = (field: keyof UserData, value: string | number) => {
        setUserData(prev => ({
            ...prev,
            [field]: typeof value === 'string' ? (field === 'gender' ? value : parseFloat(value)) : value
        }));
    };

    const handleCityChange = (cityName: string) => {
        const city = cities.find(c => c.name === cityName);
        if (city) {
            setUserData(prev => ({
                ...prev,
                air_pollution_exposure: city.pollution
            }));
        }
    };

    const getRiskLevel = (risk: number): { level: string; color: string; bgColor: string } => {
        if (risk === 0) return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-100' };
        if (risk === 1) return { level: 'High', color: 'text-red-600', bgColor: 'bg-red-100' };
        return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    };

    const getHealthScore = (): number => {
        if (!predictionResult) return 0;
        const totalRisks = Object.values(predictionResult).reduce((sum, risk) => sum + risk, 0);
        return Math.max(0, 100 - (totalRisks * 15));
    };

    const getRecommendations = (): string[] => {
        if (!predictionResult) return [];
        
        const recommendations: string[] = [];
        
        if (predictionResult.hypertension_risk === 1) {
            recommendations.push('Monitor blood pressure regularly');
            recommendations.push('Reduce sodium intake in diet');
            recommendations.push('Practice stress management techniques');
        }
        
        if (predictionResult.diabetes_risk === 1) {
            recommendations.push('Monitor blood glucose levels');
            recommendations.push('Adopt a low-sugar diet');
            recommendations.push('Increase physical activity');
        }
        
        if (predictionResult.heart_attack_risk === 1) {
            recommendations.push('Maintain heart-healthy diet');
            recommendations.push('Regular cardiovascular exercise');
            recommendations.push('Avoid smoking and excessive alcohol');
        }
        
        if (predictionResult.obesity === 1) {
            recommendations.push('Focus on weight management');
            recommendations.push('Balanced diet with portion control');
            recommendations.push('Regular exercise routine');
        }
        
        if (userData.physical_activity <= 2) {
            recommendations.push('Increase physical activity to 150 minutes/week');
        }
        
        if (userData.stress_level >= 7) {
            recommendations.push('Practice meditation or yoga');
        }
        
        return recommendations.length > 0 ? recommendations : ['Continue maintaining your healthy lifestyle!'];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-green-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Heart className="h-8 w-8 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">HealthAnalyzer</h1>
                                <p className="text-sm text-gray-600">AI-Powered Health Assessment</p>
                            </div>
                        </div>
                        <button
                            className="px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
                            onClick={() => router.push('/')}
                        >
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200 p-8 health-card">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <User className="h-6 w-6 text-green-600 mr-3" />
                            Health Information
                        </h2>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Age</label>
                                    <input
                                        type="number"
                                        value={userData.age}
                                        onChange={(e) => handleInputChange('age', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter age"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Gender</label>
                                    <select
                                        value={userData.gender}
                                        onChange={(e) => handleInputChange('gender', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">BMI</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={userData.bmi}
                                        onChange={(e) => handleInputChange('bmi', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter BMI"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Blood Glucose (mg/dL)</label>
                                    <input
                                        type="number"
                                        value={userData.blood_glucose_level}
                                        onChange={(e) => handleInputChange('blood_glucose_level', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter glucose level"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">HbA1c Level (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={userData.hba1c_level}
                                        onChange={(e) => handleInputChange('hba1c_level', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter HbA1c"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-gray-700">Diet Score: {userData.diet_score}/10</label>
                                    <div className="px-3">
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={userData.diet_score}
                                            onChange={(e) => handleInputChange('diet_score', parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                            style={{
                                                background: `linear-gradient(to right, #10b981 0%, #10b981 ${((userData.diet_score - 1) / 9) * 100}%, #e5e7eb ${((userData.diet_score - 1) / 9) * 100}%, #e5e7eb 100%)`
                                            }}
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>Poor</span>
                                            <span>Excellent</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-gray-700">Stress Level: {userData.stress_level}/10</label>
                                    <div className="px-3">
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={userData.stress_level}
                                            onChange={(e) => handleInputChange('stress_level', parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                            style={{
                                                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((userData.stress_level - 1) / 9) * 100}%, #e5e7eb ${((userData.stress_level - 1) / 9) * 100}%, #e5e7eb 100%)`
                                            }}
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>Low</span>
                                            <span>High</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="  text-sm font-semibold text-gray-700 flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                                        Select Your City
                                    </label>
                                    <select
                                        onChange={(e) => handleCityChange(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Choose your city</option>
                                        {cities.map((city) => (
                                            <option key={city.name} value={city.name}>
                                                {city.name} (Pollution Level: {city.pollution}/10)
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Current Air Pollution Exposure: {userData.air_pollution_exposure}/10
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Lifestyle Habits</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-3">
                                        <label className="block text-sm font-semibold text-gray-700">Smoking</label>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => handleInputChange('smoking', userData.smoking === 1 ? 0 : 1)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                                                    userData.smoking === 1 ? 'bg-red-600' : 'bg-gray-200'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                        userData.smoking === 1 ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                            <span className={`text-sm font-medium ${
                                                userData.smoking === 1 ? 'text-red-600' : 'text-gray-500'
                                            }`}>
                                                {userData.smoking === 1 ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-semibold text-gray-700">Alcohol Consumption</label>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => handleInputChange('alcohol_consumption', userData.alcohol_consumption === 1 ? 0 : 1)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                                                    userData.alcohol_consumption === 1 ? 'bg-orange-600' : 'bg-gray-200'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                        userData.alcohol_consumption === 1 ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                            <span className={`text-sm font-medium ${
                                                userData.alcohol_consumption === 1 ? 'text-orange-600' : 'text-gray-500'
                                            }`}>
                                                {userData.alcohol_consumption === 1 ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-semibold text-gray-700">Regular Physical Activity</label>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => handleInputChange('physical_activity', userData.physical_activity === 1 ? 0 : 1)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                                                    userData.physical_activity === 1 ? 'bg-green-600' : 'bg-gray-200'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                        userData.physical_activity === 1 ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                            <span className={`text-sm font-medium ${
                                                userData.physical_activity === 1 ? 'text-green-600' : 'text-gray-500'
                                            }`}>
                                                {userData.physical_activity === 1 ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={analyzeHealth}
                                disabled={isAnalyzing}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 analyze-button"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Analyzing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap className="h-5 w-5" />
                                        <span>Analyze Health Profile</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200 p-8 health-card">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                            AI Analysis Results
                        </h2>

                        {predictionResult ? (
                            <div className="space-y-6">
                                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200">
                                    <div className="text-5xl font-bold text-green-600 mb-3">
                                        {getHealthScore()}%
                                    </div>
                                    <div className="text-xl text-gray-700 mb-4">Overall Health Score</div>
                                    <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                        <Shield className="h-4 w-4 mr-2" />
                                        Health Assessment Complete
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl border">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                            <Target className="h-5 w-5 text-blue-500 mr-2" />
                                            Risk Assessment
                                        </h3>
                                        <div className="space-y-3">
                                            {Object.entries(predictionResult).map(([key, value]) => {
                                                const riskInfo = getRiskLevel(value);
                                                return (
                                                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <span className="text-sm font-medium text-gray-700 capitalize">
                                                            {key.replace(/_/g, ' ')}
                                                        </span>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${riskInfo.bgColor} ${riskInfo.color}`}>
                                                            {riskInfo.level}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl border">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                            Recommendations
                                        </h3>
                                        <div className="space-y-2">
                                            {getRecommendations().map((rec, index) => (
                                                <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                    <span className="text-sm text-gray-700">{rec}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                                    <Activity className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready for Analysis</h3>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    Enter your health information and click "Analyze Health Profile" to receive AI-powered health insights and personalized recommendations.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyzerPage;