
import React from 'react';

interface Props {
  currentView: string;
  onNavigate: (view: any) => void;
}

const Navbar: React.FC<Props> = ({ currentView, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-[100] border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center transform rotate-3 shadow-lg shadow-orange-200 group-hover:rotate-0 transition-transform">
              <span className="text-white font-black text-2xl">H</span>
            </div>
            <div className="flex flex-col ml-1">
              <span className="text-2xl font-black text-slate-900 leading-none">Hoora</span>
              <span className="text-[10px] font-bold text-orange-600 tracking-[0.2em] uppercase">Ranchi</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <button 
              onClick={() => onNavigate('home')} 
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'home' ? 'text-orange-600' : 'text-slate-500 hover:text-orange-600'}`}
            >
              Start
            </button>
            <button 
              onClick={() => onNavigate('services')} 
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'services' ? 'text-orange-600' : 'text-slate-500 hover:text-orange-600'}`}
            >
              Catalog
            </button>
            <button 
              onClick={() => onNavigate('about')} 
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'about' ? 'text-orange-600' : 'text-slate-500 hover:text-orange-600'}`}
            >
              Story
            </button>
            <button 
              onClick={() => onNavigate('booking')}
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-slate-100 active:scale-95"
            >
              Book
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => onNavigate('booking')} className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
              Book
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
