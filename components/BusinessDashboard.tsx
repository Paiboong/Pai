import React from 'react';
// FIX: Added SparklesIcon to the import list.
import { ArrowDownIcon, ArrowUpIcon, ChartBarIcon, LightbulbIcon, MegaphoneIcon, UsersIcon, CurrencyDollarIcon, FlagIcon, SparklesIcon } from './icons';

// --- MOCK DATA --- //
const overviewData = {
    visitors: { value: 247, change: 12.5, changeType: 'increase' },
    revenue: { value: 4250, change: 8.2, changeType: 'increase' },
    avgRating: { value: 4.8, change: 0.1, changeType: 'increase' },
    peakTime: '7:00 PM',
};

const revenueChartData = [
    { name: 'Mon', value: 1800 }, { name: 'Tue', value: 2200 }, { name: 'Wed', value: 2500 },
    { name: 'Thu', value: 2100 }, { name: 'Fri', value: 3800 }, { name: 'Sat', value: 4250 },
    { name: 'Sun', value: 3500 },
];
const maxRevenue = Math.max(...revenueChartData.map(d => d.value));

const aiAdvisorTips = [
    { title: "Launch a 'Happy Hour'", description: "Offer a 20% discount between 3 PM - 5 PM on weekdays to attract customers during off-peak hours." },
    { title: "Engage on Community Board", description: "Share your 'Dish of the Week' on the community board to attract fellow businesses and foodies." },
    { title: "Create a Tourist Mission", description: "Partner with a nearby attraction to create a mission. 'Visit Wat Pha Lat & enjoy a free Thai Iced Tea at our cafe.'" },
];

const activePromotions = [
    { name: "Monsoon Season Special", metric: "157 Clicks", status: "Active" },
    { name: "Check-in Discount", metric: "88 Redemptions", status: "Active" },
];

const communityPosts = [
    { author: "Baan Cafe", content: "We're experimenting with a new Mango Sticky Rice croissant! Any thoughts from other cafe owners?", avatar: "https://picsum.photos/seed/baancafe/40/40" },
    { author: "Phuket Tours Co.", content: "Heads up, the road to the Big Buddha viewpoint will have some closures next Tuesday morning for a local event.", avatar: "https://picsum.photos/seed/phukettours/40/40" },
];

// --- SUB-COMPONENTS --- //

const InfoCard = ({ icon, title, value, change, changeType, unit = '' }) => {
    const ChangeIcon = changeType === 'increase' ? ArrowUpIcon : ArrowDownIcon;
    const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
                <p className="font-semibold">{title}</p>
                {icon}
            </div>
            <div>
                <p className="text-3xl font-bold text-dark mt-2">{unit}{value.toLocaleString()}</p>
                {change && (
                    <div className={`flex items-center text-sm mt-1 ${changeColor}`}>
                        <ChangeIcon className="h-4 w-4" />
                        <span>{change}% vs last week</span>
                    </div>
                )}
            </div>
        </div>
    );
};


const ChartCard = () => (
    <div className="bg-white p-5 rounded-lg shadow-md md:col-span-2 xl:col-span-2">
        <h3 className="text-lg font-bold text-dark mb-4">Weekly Revenue</h3>
        <div className="flex justify-between items-end h-48">
            {revenueChartData.map(day => (
                <div key={day.name} className="flex flex-col items-center w-1/7">
                    <div
                        className="w-8 bg-accent rounded-t-md hover:bg-primary transition-colors"
                        style={{ height: `${(day.value / maxRevenue) * 100}%` }}
                        title={`$${day.value}`}
                    ></div>
                    <p className="text-xs text-gray-500 mt-2">{day.name}</p>
                </div>
            ))}
        </div>
    </div>
);

const AIAdvisorCard = () => (
    <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-4">
            <LightbulbIcon className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-bold text-dark">AI Micro-Advisor</h3>
        </div>
        <div className="space-y-4">
            {aiAdvisorTips.map((tip, index) => (
                <div key={index}>
                    <p className="font-semibold text-secondary">{tip.title}</p>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
            ))}
        </div>
    </div>
);

const ActionListCard = ({ title, icon, items, buttonText }) => (
    <div className="bg-white p-5 rounded-lg shadow-md flex flex-col">
        <div className="flex items-center gap-3 mb-4">
            {icon}
            <h3 className="text-lg font-bold text-dark">{title}</h3>
        </div>
        <div className="space-y-3 flex-grow">
            {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-light p-3 rounded-md">
                    <div>
                        <p className="font-semibold text-secondary">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.metric}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {item.status}
                    </span>
                </div>
            ))}
        </div>
        <button className="mt-4 w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-dark transition-colors">
            {buttonText}
        </button>
    </div>
);


const CommunityCard = () => (
    <div className="bg-white p-5 rounded-lg shadow-md xl:col-span-2">
        <h3 className="text-lg font-bold text-dark mb-4">Community Board</h3>
        <div className="space-y-4">
            {communityPosts.map((post, index) => (
                <div key={index} className="flex items-start gap-3">
                    <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-dark">{post.author}</p>
                        <p className="text-sm text-gray-600">{post.content}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


// --- MAIN DASHBOARD COMPONENT --- //

export const BusinessDashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-dark">Business Dashboard</h2>
                <p className="text-gray-600">Welcome back! Here's an overview of your business performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <InfoCard 
                    icon={<UsersIcon className="h-6 w-6" />}
                    title="Today's Visitors"
                    value={overviewData.visitors.value}
                    change={overviewData.visitors.change}
                    changeType={overviewData.visitors.changeType}
                />
                 <InfoCard 
                    icon={<CurrencyDollarIcon className="h-6 w-6" />}
                    title="Today's Revenue"
                    value={overviewData.revenue.value}
                    change={overviewData.revenue.change}
                    changeType={overviewData.revenue.changeType}
                    unit="$"
                />
                 <InfoCard 
                    icon={<SparklesIcon className="h-6 w-6" />}
                    title="Average Rating"
                    value={overviewData.avgRating.value}
                    change={overviewData.avgRating.change}
                    changeType={overviewData.avgRating.changeType}
                />
                 <div className="bg-secondary text-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <p className="font-semibold text-gray-300">Predicted Peak Time</p>
                    <p className="text-3xl font-bold mt-1">{overviewData.peakTime}</p>
                 </div>
                
                <ChartCard />

                <AIAdvisorCard />

                <ActionListCard 
                    title="Active Promotions"
                    icon={<MegaphoneIcon className="h-6 w-6 text-primary" />}
                    items={activePromotions}
                    buttonText="Create Promotion"
                />
                
                <CommunityCard />

                <ActionListCard 
                    title="Your Missions"
                    icon={<FlagIcon className="h-6 w-6 text-accent" />}
                    items={[{name: "Old Town Cafe Hunt", metric: "25 Participants", status: "Active"}]}
                    buttonText="Create Mission"
                />
            </div>
        </div>
    );
};