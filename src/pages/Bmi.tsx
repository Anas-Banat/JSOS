
import React, { useEffect, useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const BmiContent = () => {
  const { t, language } = useLanguage();
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  
  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);

  const calculateBMI = () => {
    if (height && weight && height > 0 && weight > 0) {
      // Convert height from cm to meters
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBMI.toFixed(1)));
      
      // Determine BMI category
      if (calculatedBMI < 18.5) {
        setCategory(language === 'ar' ? 'نقص الوزن' : 'Underweight');
      } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
        setCategory(language === 'ar' ? 'وزن طبيعي' : 'Normal weight');
      } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
        setCategory(language === 'ar' ? 'زيادة الوزن' : 'Overweight');
      } else if (calculatedBMI >= 30 && calculatedBMI < 35) {
        setCategory(language === 'ar' ? 'سمنة من الدرجة الأولى' : 'Obesity Class I');
      } else if (calculatedBMI >= 35 && calculatedBMI < 40) {
        setCategory(language === 'ar' ? 'سمنة من الدرجة الثانية' : 'Obesity Class II');
      } else {
        setCategory(language === 'ar' ? 'سمنة من الدرجة الثالثة' : 'Obesity Class III');
      }
    }
  };

  const resetForm = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  const getBmiCategoryColor = () => {
    if (!bmi) return 'text-gray-500';
    
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi >= 18.5 && bmi < 25) return 'text-green-500';
    if (bmi >= 25 && bmi < 30) return 'text-yellow-500';
    if (bmi >= 30 && bmi < 35) return 'text-orange-500';
    if (bmi >= 35 && bmi < 40) return 'text-red-500';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <h1 className="section-title text-center animate-on-scroll">{t('navBmi')}</h1>
          <p className="text-center text-gray-600 mb-8 animate-on-scroll max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'مؤشر كتلة الجسم (BMI) هو قياس للعلاقة بين وزنك وطولك. يستخدم لتقييم ما إذا كان وزنك في النطاق الصحي.' 
              : 'Body Mass Index (BMI) is a measure of the relationship between your weight and height. It is used to assess whether your weight is within a healthy range.'}
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-6 animate-on-scroll">
              <h2 className="text-xl font-bold mb-4">
                {language === 'ar' ? 'حاسبة مؤشر كتلة الجسم' : 'BMI Calculator'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="height" className="block text-sm font-medium mb-1">
                    {language === 'ar' ? 'الطول (سم)' : 'Height (cm)'}
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : '')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jsos-green-500"
                    placeholder={language === 'ar' ? 'أدخل طولك بالسنتيمتر' : 'Enter your height in centimeters'}
                    min="1"
                  />
                </div>
                
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium mb-1">
                    {language === 'ar' ? 'الوزن (كغ)' : 'Weight (kg)'}
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : '')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jsos-green-500"
                    placeholder={language === 'ar' ? 'أدخل وزنك بالكيلوغرام' : 'Enter your weight in kilograms'}
                    min="1"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    className="bg-jsos-green-600 hover:bg-jsos-green-700 flex-1" 
                    onClick={calculateBMI}
                  >
                    {language === 'ar' ? 'احسب' : 'Calculate'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-jsos-green-600 text-jsos-green-700 hover:bg-jsos-green-50 flex-1" 
                    onClick={resetForm}
                  >
                    {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                  </Button>
                </div>
              </div>
              
              {bmi !== null && (
                <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'ar' ? 'نتيجتك:' : 'Your Result:'}
                  </h3>
                  <p className="text-2xl font-bold mb-1">
                    BMI: <span className={getBmiCategoryColor()}>{bmi}</span>
                  </p>
                  <p className="text-lg">
                    {language === 'ar' ? 'التصنيف:' : 'Category:'} <span className={getBmiCategoryColor() + ' font-semibold'}>{category}</span>
                  </p>
                </div>
              )}
            </div>
            
            <div className="md:w-1/2 bg-white rounded-lg shadow-lg p-6 animate-on-scroll">
              <h2 className="text-xl font-bold mb-4">
                {language === 'ar' ? 'فهم مؤشر كتلة الجسم' : 'Understanding BMI'}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 border-l-4 border-blue-500 bg-blue-50">
                  <div className="flex-1">
                    <p className="font-semibold">
                      {language === 'ar' ? 'نقص الوزن' : 'Underweight'}
                    </p>
                    <p className="text-sm text-gray-600">BMI: &lt; 18.5</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50">
                  <div className="flex-1">
                    <p className="font-semibold">
                      {language === 'ar' ? 'وزن طبيعي' : 'Normal weight'}
                    </p>
                    <p className="text-sm text-gray-600">BMI: 18.5 - 24.9</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border-l-4 border-yellow-500 bg-yellow-50">
                  <div className="flex-1">
                    <p className="font-semibold">
                      {language === 'ar' ? 'زيادة الوزن' : 'Overweight'}
                    </p>
                    <p className="text-sm text-gray-600">BMI: 25 - 29.9</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border-l-4 border-orange-500 bg-orange-50">
                  <div className="flex-1">
                    <p className="font-semibold">
                      {language === 'ar' ? 'سمنة من الدرجة الأولى' : 'Obesity Class I'}
                    </p>
                    <p className="text-sm text-gray-600">BMI: 30 - 34.9</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border-l-4 border-red-500 bg-red-50">
                  <div className="flex-1">
                    <p className="font-semibold">
                      {language === 'ar' ? 'سمنة من الدرجة الثانية' : 'Obesity Class II'}
                    </p>
                    <p className="text-sm text-gray-600">BMI: 35 - 39.9</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border-l-4 border-red-600 bg-red-50">
                  <div className="flex-1">
                    <p className="font-semibold">
                      {language === 'ar' ? 'سمنة من الدرجة الثالثة' : 'Obesity Class III'}
                    </p>
                    <p className="text-sm text-gray-600">BMI: &ge; 40</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-gray-600 text-sm">
                <p>
                  {language === 'ar' 
                    ? 'ملاحظة: مؤشر كتلة الجسم هو أداة فحص عامة وقد لا يكون مناسبًا للأشخاص ذوي الكتلة العضلية العالية مثل الرياضيين، أو كبار السن، أو الأطفال. استشر أخصائي الرعاية الصحية لتقييم وزنك وصحتك بشكل شامل.' 
                    : 'Note: BMI is a general screening tool and may not be appropriate for people with high muscle mass like athletes, elderly individuals, or children. Consult a healthcare professional for a comprehensive assessment of your weight and health.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Bmi = () => {
  return (
    <LanguageProvider>
      <BmiContent />
    </LanguageProvider>
  );
};

export default Bmi;
