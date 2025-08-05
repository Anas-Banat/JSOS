
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { t, language } = useLanguage();
  const animationRef = useRef<() => void>();
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    animationRef.current = setupScrollAnimation();
    return () => {
      if (animationRef.current) {
        animationRef.current();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !title || !message) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill out all required fields',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store contact form data in Supabase - match the expected schema
      const { error } = await supabase
        .from('contacts')
        .insert({
          name,
          email: phone, // Using phone as email since that's what the schema expects
          subject: title,
          message
        });
      
      if (error) throw error;
      
      // Success message
      toast({
        title: language === 'ar' ? 'تم الإرسال بنجاح' : 'Message Sent',
        description: language === 'ar' ? 'شكراً لتواصلك معنا. سنرد عليك قريباً.' : 'Thanks for contacting us. We will get back to you soon.',
        variant: 'default'
      });
      
      // Reset form
      setName('');
      setPhone('');
      setTitle('');
      setMessage('');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: language === 'ar' ? 'حدث خطأ' : 'Error Occurred',
        description: language === 'ar' ? 'فشل في إرسال الرسالة. الرجاء المحاولة مرة أخرى.' : 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container-custom mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0 animate-on-scroll">
            <p className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('contactSubtitle')}</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-jsos-green-100 p-3 rounded-full flex-shrink-0">
                  <MapPin className="text-jsos-green-600" size={24} />
                </div>
                <div className="mx-4">
                  <h3 className="text-lg mt-2 font-semibold">Amman, Jordan</h3>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-jsos-green-100 p-3 rounded-full flex-shrink-0">
                  <Phone className="text-jsos-green-600" size={24} />
                </div>
                <div className="mx-4">
                  <h3 className="text-lg mt-2 font-semibold"> 065665620</h3>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-jsos-green-100 p-3 rounded-full flex-shrink-0">
                  <Mail className="text-jsos-green-600" size={24} />
                </div>
                <div className="mx-4">
                  <h3 className="text-lg mt-2 font-semibold"> info@obesity-jo.com </h3>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 animate-on-scroll">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">{t('formName')}</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jsos-green-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">{t('formPhone')}</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jsos-green-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-1">{t('formTitle')}</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jsos-green-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-1">{t('formMessage')}</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jsos-green-500"
                  required
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 
                  (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') : 
                  t('formSubmit')
                }
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
