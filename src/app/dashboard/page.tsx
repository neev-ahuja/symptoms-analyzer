'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Heart, Brain, Shield, TrendingUp, Users, Calendar, Settings, ArrowRight, Zap, Target, CheckCircle } from 'lucide-react';

const DashboardPage = () => {
    const router = useRouter();

    const healthMetrics = [
        {
            title: 'Health Analyses',
            value: '12',
            change: '+3 this month',
            icon: Activity,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Risk Assessments',
            value: '8',
            change: '+2 this week',
            icon: Shield,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: 'Health Score',
            value: '85%',
            change: '+5% improvement',
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        },
        {
            title: 'Recommendations',
            value: '24',
            change: '6 completed',
            icon: Target,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
        }
    ];

    const quickActions = [
        {
            title: 'New Health Analysis',
            description: 'Get AI-powered health insights',
            icon: Zap,
            color: 'from-green-600 to-green-700',
            action: () => router.push('/analyzer')
        },
        {
            title: 'View Results',
            description: 'Check your latest analysis',
            icon: TrendingUp,
            color: 'from-blue-600 to-blue-700',
            action: () => router.push('/results')
        },
        {
            title: 'Health Tips',
            description: 'Personalized recommendations',
            icon: Heart,
            color: 'from-purple-600 to-purple-700',
            action: () => router.push('/tips')
        },
        {
            title: 'Settings',
            description: 'Manage your preferences',
            icon: Settings,
            color: 'from-gray-600 to-gray-700',
            action: () => router.push('/settings')
        }
    ];

    const recentActivities = [
        {
            title: 'Health Analysis Completed',
            description: 'Overall health score: 85%',
            time: '2 hours ago',
            icon: CheckCircle,
            color: 'text-green-600'
        },
        {
            title: 'Risk Assessment Updated',
            description: 'Diabetes risk: Low',
            time: '1 day ago',
            icon: Shield,
            color: 'text-blue-600'
        },
        {
            title: 'Recommendations Generated',
            description: '6 new health tips available',
            time: '3 days ago',
            icon: Target,
            color: 'text-purple-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-2">Health Dashboard</h1>
                    <p className="text-gray-600">Monitor your health journey and track your progress</p>
                </div>

                {/* Health Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {healthMetrics.map((metric, index) => {
                        const IconComponent = metric.icon;
                        return (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 health-card">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                                        <IconComponent className={`h-6 w-6 ${metric.color}`} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                                        <div className="text-sm text-gray-500">{metric.title}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-green-600 font-medium">{metric.change}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 health-card">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Zap className="h-6 w-6 text-green-600 mr-3" />
                                Quick Actions
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {quickActions.map((action, index) => {
                                    const IconComponent = action.icon;
                                    return (
                                        <button
                                            key={index}
                                            onClick={action.action}
                                            className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02] text-left group health-card"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} text-white`}>
                                                    <IconComponent className="h-5 w-5" />
                                                </div>
                                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                                            <p className="text-sm text-gray-600">{action.description}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 health-card">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                                Recent Activity
                            </h2>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => {
                                    const IconComponent = activity.icon;
                                    return (
                                        <div key={index} className="flex items-start p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 health-card">
                                            <div className="flex-shrink-0 mr-3">
                                                <IconComponent className={`h-5 w-5 ${activity.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
                                                <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Health Insights */}
                <div className="mt-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 health-card">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <Brain className="h-6 w-6 text-purple-600 mr-3" />
                            Health Insights
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                <div className="flex items-center mb-3">
                                    <Heart className="h-5 w-5 text-green-600 mr-2" />
                                    <h3 className="font-semibold text-gray-900">Cardiovascular Health</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Your heart health indicators are within normal ranges. Continue your current exercise routine.</p>
                                <div className="text-xs text-green-600 font-medium">Status: Good</div>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                <div className="flex items-center mb-3">
                                    <Activity className="h-5 w-5 text-blue-600 mr-2" />
                                    <h3 className="font-semibold text-gray-900">Metabolic Health</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Blood glucose levels are stable. Consider monitoring your diet for optimal results.</p>
                                <div className="text-xs text-blue-600 font-medium">Status: Monitoring</div>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                <div className="flex items-center mb-3">
                                    <Shield className="h-5 w-5 text-purple-600 mr-2" />
                                    <h3 className="font-semibold text-gray-900">Risk Factors</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Low risk profile detected. Maintain healthy lifestyle habits for continued wellness.</p>
                                <div className="text-xs text-purple-600 font-medium">Status: Low Risk</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-2">Ready for Your Next Health Check?</h2>
                        <p className="text-green-100 mb-6">Get personalized insights and recommendations with our AI-powered health analyzer.</p>
                        <button
                            onClick={() => router.push('/analyzer')}
                            className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-[1.02] inline-flex items-center"
                        >
                            <Zap className="h-5 w-5 mr-2" />
                            Start New Analysis
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;