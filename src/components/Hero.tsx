import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Star, Award, Users, Clock } from 'lucide-react'

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Full-bleed background image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/4022219/pexels-photo-4022219.jpeg?auto=compress&cs=tinysrgb&w=1200')"
      }}
    />

    {/* Overlay filter for readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-off-white/80 to-brand-light-gray/60" />

    {/* Decorative blobs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-brand-slate-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute right-20 top-1/4 w-64 h-64 bg-brand-silver/10 rounded-full blur-2xl"></div>
      <div className="absolute left-1/3 bottom-16 w-80 h-80 bg-brand-slate-blue-light/20 rounded-full blur-3xl"></div>
    </div>

    {/* Content */}
    <div className="container-custom relative z-10 mx-auto flex flex-col-reverse lg:flex-row items-center py-24 gap-12">
      {/* Left text */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
        <div className="inline-flex items-center bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-brand-slate-blue text-brand-slate-blue" />
          ))}
          <span className="ml-3 font-semibold text-brand-slate-blue">5.0</span>
          <span className="ml-2 text-brand-gray-600">• 500+ Transformations</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal leading-tight">
          Polish Your<br/>
          <span className="relative inline-block">
            <span className="text-brand-slate-blue font-semibold">Natural Beauty</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-brand-slate-blue via-brand-silver to-brand-slate-blue-light rounded-full"></span>
          </span>
        </h1>

        <p className="max-w-xl mx-auto lg:mx-0 text-lg text-brand-gray-600">
          We specialise in creating timeless radiance—where advanced science meets bespoke care.
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
          {[
            ['35', 'Treatments'],
            ['50+', 'Beauticians'],
            ['98%', 'Satisfaction']
          ].map(([num, label]) => (
            <div key={label} className="space-y-1">
              <div className="text-3xl font-serif font-bold text-brand-slate-blue">{num}</div>
              <div className="text-sm font-medium text-brand-gray-600">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/treatments" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-brand-slate-blue to-brand-slate-blue-light text-white py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition">
              Start Your Transformation <Clock className="inline-block ml-2" />
            </Button>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-2 border-brand-slate-blue text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white py-4 px-8 rounded-xl backdrop-blur-sm transition">
              Free Consultation
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 mt-6 justify-center lg:justify-start text-brand-gray-600">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-brand-slate-blue" />
            <span>Certified Practitioners</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-brand-slate-blue" />
            <span>Personalised Care</span>
          </div>
        </div>
      </div>

      {/* Pixel accents (optional) */}
      <div className="absolute top-12 left-12 w-16 h-16 bg-brand-silver/20" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
      <div className="absolute bottom-12 right-12 w-20 h-20 bg-brand-slate-blue-light/20" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
    </div>
  </section>
)

export default Hero