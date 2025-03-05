import React, { useState, useEffect, useRef } from 'react';
import SkuemorphicContainer from "~/components/UI/SkuemorphicContainer";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Loader2 } from 'lucide-react';

const OverviewAnalysis = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isExpanded]);

  // Sample conversation data
  const conversationData = {
    summary: "A high-net-worth individual from Delhi is seeking a luxurious 3BHK apartment in South Mumbai with a budget of ₹8-10 crores. Key requirements include a sea view, modern amenities, proximity to international schools, and parking for at least three cars. The client is willing to consider properties in prime locations like Colaba, Nariman Point, and Lower Parel.",
    keyPoints: [
      "Budget: ₹8-10 Crores (flexible for the right property)",
      "Preferred Locations: Colaba, Nariman Point, Lower Parel",
      "Property Type: 3BHK, 2000+ sqft, sea-facing",
      "Amenities: Modern facilities, gym, pool, 24/7 security",
      "Timeline: 3-6 months for possession",
      "Additional: Proximity to international schools and business hubs"
    ],
    charts: {
      budgetDistribution: [
        { name: '8-10cr', value: 40, color: '#ef4444' }, // Red-500
        { name: '5-8cr', value: 25, color: '#f97316' }, // Orange-500
        { name: '10cr+', value: 20, color: '#f59e0b' }, // Amber-500
        { name: '2-5cr', value: 15, color: '#dc2626' } // Red-600
      ],
      areaPreferences: [
        { area: 'South Mumbai', clients: 45 },
        { area: 'Bandra', clients: 30 },
        { area: 'Powai', clients: 15 },
        { area: 'Thane', clients: 10 }
      ]
    }
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummaryText(e.target.value);
  };

  return (
    <SkuemorphicContainer
      ref={containerRef}
      className={`h-full ${isExpanded ? 'fixed inset-0 z-50' : 'w-full'} flex flex-col bg-gray-900 p-6 relative overflow-hidden`}
    >
      {/* Glowing background with red/orange gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 animate-pulse blur-xl" />

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="text-red-400 h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className={`z-10 h-full w-full space-y-6 flex flex-col`}>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className='text-2xl font-bold text-center font-subheading bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent'>
                Client Insights
              </h2>
              <p className="text-sm text-gray-400 font-subheading">Conversation Analysis</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-3">
            {/* Conversation Preview */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-red-500/30">
              <h3 className="text-red-400 text-lg font-semibold mb-3">Recent Dialogue</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="border-l-4 border-red-500 pl-3">
                  <p className="font-medium">Client:</p>
                  <p>"I'm looking for a spacious 3BHK in South Mumbai with a sea view. My budget is around ₹8-10 crores, but I can stretch it for the right property. It should have modern amenities and be close to good schools."</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-3">
                  <p className="font-medium">You:</p>
                  <p>"We have some excellent options in Oberoi Sky City and Lodha Bellissimo. Both offer sea views, premium amenities, and are close to international schools. When would you like to schedule a visit?"</p>
                </div>
              </div>
            </div>

            {/* Editable Summary */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-red-500/30">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-red-400 text-lg font-semibold">Detailed Summary</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  {isEditing ? 'Save Summary' : 'Edit Summary'}
                </button>
              </div>
              {isEditing ? (
                <textarea
                  className="w-full bg-gray-900/50 text-gray-300 p-3 rounded-lg text-sm"
                  value={summaryText || conversationData.summary}
                  onChange={handleSummaryChange}
                  rows={5}
                />
              ) : (
                <p className="text-sm text-gray-300 leading-relaxed">
                  {summaryText || conversationData.summary}
                </p>
              )}
            </div>

            {/* Charts Section */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 p-4 rounded-xl border border-red-500/30">
                <h4 className="text-red-400 text-lg font-semibold mb-3">Budget Distribution</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={conversationData.charts.budgetDistribution}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      label
                    >
                      {conversationData.charts.budgetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: '#1f2937',
                        borderColor: '#ef4444', // Red-500
                        borderRadius: '8px',
                        padding: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-red-500/30">
                <h4 className="text-red-400 text-lg font-semibold mb-3">Area Preferences</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={conversationData.charts.areaPreferences}>
                    <XAxis
                      dataKey="area"
                      stroke="#f97316" // Orange-500
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      stroke="#f97316" // Orange-500
                      tick={{ fontSize: 12 }}
                    />
                    <Bar
                      dataKey="clients"
                      fill="#ef4444" // Red-500
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#1f2937',
                        borderColor: '#ef4444', // Red-500
                        borderRadius: '8px',
                        padding: '8px'
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-red-500/30">
              <h3 className="text-red-400 text-lg font-semibold mb-3">Critical Requirements</h3>
              <ul className="space-y-2">
                {conversationData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                    <span className="text-red-500 mt-1">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </SkuemorphicContainer>
  );
};

export default OverviewAnalysis;
