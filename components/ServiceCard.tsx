
import React from 'react';
import { ServiceDetail } from '../types';

interface Props {
  service: ServiceDetail;
  onSelect: (service: ServiceDetail) => void;
}

const ServiceCard: React.FC<Props> = ({ service, onSelect }) => {
  const isUltimate = service.name.includes('Ultimate');

  return (
    <div className={`relative bg-white rounded-[2.5rem] p-8 border ${isUltimate ? 'border-orange-500 ring-4 ring-orange-900/10' : 'border-slate-800'} hover:shadow-2xl transition-all duration-300 group flex flex-col h-full overflow-hidden hover:-translate-y-2`}>
      {isUltimate && (
        <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest">
          Recommended
        </div>
      )}
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></span>
            {service.vehicleType}
          </span>
          <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">{service.name}</h3>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black text-slate-900 italic">₹{service.price}</span>
        </div>
      </div>
      
      <div className="mb-8 flex-grow">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {service.duration}
          </div>
        </div>
        <ul className="space-y-4">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-500">
              <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={() => onSelect(service)}
        className="w-full py-5 rounded-[1.5rem] bg-slate-900 text-white font-black text-[11px] tracking-widest uppercase hover:bg-orange-600 transition-all duration-300 shadow-xl"
      >
        Choose Plan
      </button>
    </div>
  );
};

export default ServiceCard;
