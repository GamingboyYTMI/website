
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import BookingForm from './components/BookingForm';
import ChatBot from './components/ChatBot';
import { SERVICES } from './constants';
import { ServiceDetail, VehicleType } from './types';

type View = 'home' | 'services' | 'booking' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (service: ServiceDetail) => {
    setSelectedService(service);
    navigateTo('booking');
  };

  return (
    <div className="min-h-screen bg-white font-['Inter'] selection:bg-orange-100 selection:text-orange-900">
      <Navbar currentView={currentView} onNavigate={navigateTo} />
      
      <main className="pt-20">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-700">
            {/* Home View: Hero */}
            <section className="relative pt-20 pb-32 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-3/5 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-orange-50 text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-sm">
                      <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-ping"></span>
                      Directly at your doorstep
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
                      Ranchi's <br/>Elite <span className="text-orange-600 italic">Shine.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium mb-12 max-w-xl leading-relaxed">
                      Hoora is redefining vehicle care. No more waiting at wash centers. We bring professional detailing to your home in Ranchi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                      <button 
                        onClick={() => navigateTo('services')}
                        className="bg-orange-600 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-900 transition-all duration-300 shadow-2xl shadow-orange-200"
                      >
                        Pick a Package
                      </button>
                      <button 
                        onClick={() => navigateTo('booking')}
                        className="bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:border-orange-600 transition-all duration-300"
                      >
                        Instant Book
                      </button>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/5 relative">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]"></div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-slate-900 rounded-[4rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                      <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border-2 border-white bg-slate-100 aspect-[4/5] transform hover:scale-[1.02] transition-transform duration-500">
                        <img 
                          src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1200" 
                          alt="Hoora Detail" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Home View: How it Works */}
            <section className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-widest text-slate-400">The Hoora Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    { step: '01', title: 'Schedule', desc: 'Select your vehicle and a time slot that suits your Ranchi lifestyle.' },
                    { step: '02', title: 'Hoora Pro Arrives', desc: 'Our trained professional reaches your location with all the gear.' },
                    { step: '03', title: 'Drive Clean', desc: 'Pay after you inspect. Showroom quality finish, guaranteed.' }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-8 bg-white rounded-[3rem] shadow-sm border border-slate-100">
                      <div className="text-5xl font-black text-orange-100 mb-6">{item.step}</div>
                      <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === 'services' && (
          <div className="animate-in slide-in-from-bottom-8 duration-700 bg-slate-900 min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                <div className="max-w-2xl">
                  <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Professional Grade</span>
                  <h2 className="text-5xl font-black text-white mb-6 tracking-tight italic">Choose Your Polish</h2>
                  <p className="text-lg font-medium text-slate-400">Competitive pricing for Ranchi's bike and car lovers. Select a plan to start the booking.</p>
                </div>
                <div className="flex gap-4">
                  <div className="px-6 py-4 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-widest">Fixed Rates</p>
                    <p className="text-xl font-black text-orange-500">₹299+</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {SERVICES.map((service) => (
                  <ServiceCard key={service.id} service={service} onSelect={handleServiceSelect} />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'booking' && (
          <div className="animate-in slide-in-from-right-12 duration-700 py-24 bg-orange-500 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="text-center mb-12 text-white">
                 <h2 className="text-5xl font-black mb-4 tracking-tighter">Let's Get Started</h2>
                 <p className="font-black uppercase text-xs tracking-[0.3em] opacity-80">Ranchi Doorstep Service</p>
              </div>
              <BookingForm 
                initialVehicle={selectedService?.vehicleType} 
                initialPackage={selectedService?.name} 
              />
            </div>
          </div>
        )}

        {currentView === 'about' && (
          <div className="animate-in fade-in duration-700 py-32">
             <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-6xl font-black text-slate-900 mb-12 tracking-tight">The Ranchi Story</h2>
                <div className="prose prose-lg mx-auto text-slate-600 font-medium leading-relaxed space-y-8">
                  <p>Hoora started in the heart of Ranchi with one simple goal: to give vehicle owners their time back. We noticed that people spent hours on weekends at dusty wash centers, often getting sub-par results.</p>
                  <p>Our team of local professionals are trained not just to wash, but to detail. We use eco-friendly products that require 90% less water than traditional methods, protecting Jharkhand's water table while protecting your car's paint.</p>
                  <p className="text-orange-600 font-black text-2xl">From Morabadi to Dhurwa, we've got you covered.</p>
                </div>
                <button 
                  onClick={() => navigateTo('services')}
                  className="mt-16 bg-slate-900 text-white px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-orange-600 transition-all"
                >
                  See What We Offer
                </button>
             </div>
          </div>
        )}
      </main>

      <footer className="bg-white text-slate-900 pt-20 pb-12 border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pb-12 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center rotate-3">
                  <span className="text-white font-black text-xl">H</span>
                </div>
                <span className="text-2xl font-black tracking-tighter">Hoora Ranchi</span>
              </div>
              <p className="text-slate-500 font-medium max-w-sm">
                Serving the capital with pride. Experience the difference of professional doorstep detailing.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <button onClick={() => navigateTo('home')} className="font-black uppercase text-[10px] tracking-widest hover:text-orange-600 transition-colors">Home</button>
              <button onClick={() => navigateTo('services')} className="font-black uppercase text-[10px] tracking-widest hover:text-orange-600 transition-colors">Services</button>
              <button onClick={() => navigateTo('about')} className="font-black uppercase text-[10px] tracking-widest hover:text-orange-600 transition-colors">Our Story</button>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Hoora Ranchi Mobile Detailing.
            </p>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;
