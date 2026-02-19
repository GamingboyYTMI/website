
import React, { useState } from 'react';
import { VehicleType, WashPackage, BookingDetails } from '../types';
import { syncBookingToCloud } from '../services/zapierService';

interface Props {
  initialVehicle?: VehicleType;
  initialPackage?: WashPackage;
}

const BookingForm: React.FC<Props> = ({ initialVehicle, initialPackage }) => {
  const [step, setStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [formData, setFormData] = useState<Partial<BookingDetails>>({
    vehicleType: initialVehicle || VehicleType.CAR,
    package: initialPackage || WashPackage.BASIC,
    date: new Date().toISOString().split('T')[0],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    await syncBookingToCloud(formData);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-slate-50 max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="h-12 w-12 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4">Request Received!</h2>
        <p className="text-slate-500 font-medium mb-10 text-lg">Hoora Ranchi is prepping your shine. We'll text you a confirmation from our local team shortly.</p>
        <button 
          onClick={() => { setIsSubmitted(false); setStep(1); }}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-all"
        >
          Book for another ride
        </button>
      </div>
    );
  }

  return (
    <div id="booking" className="max-w-5xl mx-auto py-12 px-4">
      <div className="bg-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-50">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="lg:w-[38%] bg-slate-900 p-12 text-white flex flex-col">
            <div className="mb-10">
              <span className="text-orange-500 font-black text-sm uppercase tracking-[0.3em]">Step {step} of 3</span>
              <h3 className="text-4xl font-black mt-2 mb-6 leading-tight">Hoora <br/>Booking</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Secure your doorstep detailing in Ranchi. We bring everything needed for a showroom finish.</p>
            </div>
            
            <div className="space-y-8 flex-grow">
              {[
                { s: 1, t: 'Vehicle Select', desc: 'Choose your ride type' },
                { s: 2, t: 'Pick Time', desc: 'Schedule your window' },
                { s: 3, t: 'Your Location', desc: 'Where in Ranchi?' }
              ].map(item => (
                <div key={item.s} className={`flex items-start gap-5 transition-opacity duration-300 ${step === item.s ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${step === item.s ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50' : 'bg-slate-800 text-slate-500'}`}>
                    {item.s}
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-widest text-[10px] text-orange-500">{item.t}</p>
                    <p className="text-sm font-bold text-slate-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Ranchi Helpline</p>
              <p className="text-xl font-black text-white">+91 9123-456-789</p>
            </div>
          </div>

          <div className="lg:w-[62%] p-10 lg:p-16">
            <form onSubmit={handleSubmit} className="space-y-10">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="mb-8">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-4">Vehicle Category</label>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.values(VehicleType).map(v => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setFormData({ ...formData, vehicleType: v })}
                          className={`flex flex-col items-center justify-center py-6 px-4 rounded-3xl border-2 transition-all duration-300 ${formData.vehicleType === v ? 'border-orange-600 bg-orange-50 text-orange-700 shadow-lg shadow-orange-100 scale-105' : 'border-slate-100 hover:border-slate-300'}`}
                        >
                          <span className="text-xl mb-1">{v === VehicleType.BIKE ? '🏍️' : v === VehicleType.SUV ? '🚙' : '🚗'}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest">{v}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-4">Select Service</label>
                    <select 
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value as WashPackage })}
                      className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold text-slate-800 focus:border-orange-600 outline-none transition-all appearance-none cursor-pointer"
                    >
                      {Object.values(WashPackage).map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={handleNext} type="button" className="w-full mt-10 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-all shadow-2xl shadow-slate-100 active:scale-95">
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-4">Available Date</label>
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-orange-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-4">Time Window</label>
                      <select 
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                        className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-orange-600 appearance-none"
                      >
                        <option value="">Choose slot</option>
                        <option>Morning (09:00 - 12:00)</option>
                        <option>Noon (12:00 - 15:00)</option>
                        <option>Afternoon (15:00 - 18:00)</option>
                        <option>Evening (18:00 - 20:00)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-10">
                    <button onClick={handleBack} type="button" className="flex-1 border-2 border-slate-100 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all">
                      Back
                    </button>
                    <button onClick={handleNext} type="button" className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-all shadow-2xl active:scale-95">
                      Confirm Time
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6">
                  <div className="relative">
                    <input 
                      placeholder="WhatsApp Mobile (+91)"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-orange-600 pl-14"
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">📱</span>
                  </div>
                  <textarea 
                    placeholder="Full House/Office Address in Ranchi..."
                    rows={3}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-orange-600"
                  ></textarea>
                  <textarea 
                    placeholder="Vehicle Model & Color (e.g. Black Thar, White Bullet)"
                    rows={2}
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                    className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-orange-600"
                  ></textarea>
                  
                  <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100 mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-1">Ranchi Service Hub</p>
                    <p className="text-sm font-bold text-slate-800">Hoora pro-partners will call to verify your location. Pay via UPI/Cash after service.</p>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={handleBack} type="button" className="flex-1 border-2 border-slate-100 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50" disabled={isSyncing}>
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSyncing}
                      className="flex-[2] bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-900 transition-all shadow-2xl shadow-orange-100 disabled:opacity-70 flex items-center justify-center gap-3"
                    >
                      {isSyncing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Syncing...
                        </>
                      ) : 'Place Ranchi Order'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
