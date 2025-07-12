'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Activity, Shield, TrendingUp, AlertTriangle, CheckCircle, Target, Brain, Zap } from 'lucide-react';

interface PredictionResult {
    diabetes_risk: number;
    heart_attack_risk: number;
    hypertension_risk: number;
    diabetes: number;
    hypertension: number;
    heart_disease: number;
    obesity: number;
}

const ResultsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Parse the prediction result from URL params
    const predictionData = searchParams.get('data');
    let predictionResult: PredictionResult | null = null;
    
    try {
        if (predictionData) {
            predictionResult = JSON.parse(decodeURIComponent(predictionData));
        }
    } catch (error) {
        console.error('Error parsing prediction data:', error);
    }

    const getRiskLevel = (value: number) => {
        if (value === 0) {
            return {
                level: 'Low Risk',
                color: 'text-green-700',
                bgColor: 'bg-green-100',
                icon: CheckCircle,
                description: 'Your risk level is low. Continue maintaining healthy habits.'
            };
        } else {
            return {
                level: 'High Risk',
                color: 'text-red-700',
                bgColor: 'bg-red-100',
                icon: AlertTriangle,
                description: 'Elevated risk detected. Consider consulting with a healthcare professional.'
            };
        }
    };

    const getHealthScore = () => {
        if (!predictionResult) return 0;
        const totalRisks = Object.values(predictionResult).reduce((sum, value) => sum + value, 0);
        const maxPossibleRisks = Object.keys(predictionResult).length;
        return Math.round(((maxPossibleRisks - totalRisks) / maxPossibleRisks) * 100);
    };

    const getRecommendations = () => {
        if (!predictionResult) return [];
        
        const recommendations = [];
        
        if (predictionResult.diabetes_risk === 1 || predictionResult.diabetes === 1) {
            recommendations.push('Monitor blood sugar levels regularly');
            recommendations.push('Follow a balanced, low-sugar diet');
            recommendations.push('Maintain regular physical activity');
        }
        
        if (predictionResult.heart_attack_risk === 1 || predictionResult.heart_disease === 1) {
            recommendations.push('Focus on cardiovascular exercises');
            recommendations.push('Reduce sodium intake');
            recommendations.push('Manage stress levels effectively');
        }
        
        if (predictionResult.hypertension_risk === 1 || predictionResult.hypertension === 1) {
            recommendations.push('Monitor blood pressure regularly');
            recommendations.push('Limit alcohol consumption');
            recommendations.push('Practice relaxation techniques');
        }
        
        if (predictionResult.obesity === 1) {
            recommendations.push('Maintain a healthy weight through diet and exercise');
            recommendations.push('Consider consulting a nutritionist');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('Continue maintaining your healthy lifestyle');
            recommendations.push('Regular health check-ups are recommended');
            recommendations.push('Stay hydrated and get adequate sleep');
        }
        
        return recommendations;
    };

    const healthConditions = [
        { key: 'diabetes_risk', name: 'Diabetes Risk', icon: Target },
        { key: 'heart_attack_risk', name: 'Heart Attack Risk', icon: Heart },
        { key: 'hypertension_risk', name: 'Hypertension Risk', icon: TrendingUp },
        { key: 'diabetes', name: 'Diabetes', icon: Activity },
        { key: 'hypertension', name: 'Hypertension', icon: Shield },
        { key: 'heart_disease', name: 'Heart Disease', icon: Heart },
        { key: 'obesity', name: 'Obesity', icon: Brain }
    ];

    if (!predictionResult) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-center p-8">
                    <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h1>
                    <p className="text-gray-600 mb-6">Unable to load health analysis results.</p>
                    <button
                        onClick={() => router.push('/analyzer')}
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200"
                    >
                        Back to Analyzer
                    </button>
                </div>
            </div>
        );
    }

    const healthScore = getHealthScore();
    const recommendations = getRecommendations();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/analyzer')}
                        className="flex items-center text-green-600 hover:text-green-700 transition-colors duration-200 mb-4"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Analyzer
                    </button>
                    <h1 className="text-4xl font-bold gradient-text mb-2">Health Analysis Results</h1>
                    <p className="text-gray-600">Comprehensive AI-powered health assessment and recommendations</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Health Score Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200 p-8 health-card">
                            <div className="text-center">
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            className="text-gray-200"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="text-green-500"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeDasharray={`${healthScore}, 100`}
                                            strokeLinecap="round"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600">{healthScore}%</div>
                                            <div className="text-sm text-gray-500">Health Score</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                    <Zap className="h-4 w-4 mr-2" />
                                    Analysis Complete
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200 p-8 health-card">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Target className="h-6 w-6 text-blue-500 mr-3" />
                                Detailed Risk Assessment
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {healthConditions.map((condition) => {
                                    const value = predictionResult[condition.key as keyof PredictionResult];
                                    const riskInfo = getRiskLevel(value);
                                    const IconComponent = riskInfo.icon;
                                    
                                    return (
                                        <div key={condition.key} className="p-6 bg-white rounded-xl border border-gray-100 health-card">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center">
                                                    <condition.icon className="h-5 w-5 text-blue-500 mr-2" />
                                                    <span className="font-semibold text-gray-900">{condition.name}</span>
                                                </div>
                                                <IconComponent className={`h-5 w-5 ${value === 0 ? 'text-green-500' : 'text-red-500'}`} />
                                            </div>
                                            <div className="mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${riskInfo.bgColor} ${riskInfo.color}`}>
                                                    {riskInfo.level}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{riskInfo.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="mt-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-200 p-8 health-card">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                            Personalized Recommendations
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recommendations.map((rec, index) => (
                                <div key={index} className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 health-card">
                                    <div className="flex items-start">
                                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span className="text-sm text-gray-700 font-medium">{rec}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.push('/analyzer')}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        New Analysis
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        Print Results
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;