
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { setupScrollAnimation } from '@/utils/animation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SleeveGastrectomyContent = () => {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const cleanupAnimation = setupScrollAnimation();
    return () => cleanupAnimation();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container-custom mx-auto py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3 animate-on-scroll">
              <h1 className="section-title">{t('navSleeveGastrectomy')}</h1>
              
              <div className="prose max-w-none">
                <h2>What is Sleeve Gastrectomy?</h2>
                <p>
                  Sleeve gastrectomy is a surgical weight-loss procedure in which the stomach is reduced to about 15% of its original size, by surgical removal of a large portion of the stomach along the greater curvature. The result is a sleeve or tube-like structure. This procedure is performed laparoscopically and is not reversible.
                </p>
                
                <div className="my-6">
                  <img 
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Sleeve Gastrectomy" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
                
                <h2>How Does it Work?</h2>
                <p>
                  Sleeve gastrectomy works in two ways:
                </p>
                <ul>
                  <li>
                    <strong>Restriction:</strong> The significantly smaller stomach restricts food intake, making you feel full sooner and consume fewer calories.
                  </li>
                  <li>
                    <strong>Hormonal changes:</strong> The procedure reduces the production of ghrelin, a hunger hormone, which helps decrease appetite and hunger.
                  </li>
                </ul>
                
                <h2>Benefits of Sleeve Gastrectomy</h2>
                <ul>
                  <li>Significant weight loss, typically 60-70% of excess body weight</li>
                  <li>Improvement or resolution of obesity-related conditions such as type 2 diabetes, high blood pressure, and sleep apnea</li>
                  <li>No intestinal bypass, reducing the risk of intestinal obstruction, anemia, osteoporosis, and protein deficiency</li>
                  <li>No foreign objects placed in the body (unlike gastric banding)</li>
                  <li>Shorter hospital stay compared to gastric bypass (usually 1-2 days)</li>
                  <li>Can be performed on patients with various medical conditions who may not qualify for other bariatric procedures</li>
                </ul>
                
                <h2>Risks and Complications</h2>
                <p>Like any surgical procedure, sleeve gastrectomy comes with potential risks, including:</p>
                <ul>
                  <li>Bleeding</li>
                  <li>Infection</li>
                  <li>Adverse reactions to anesthesia</li>
                  <li>Blood clots</li>
                  <li>Leaks from the staple line where the stomach is divided</li>
                  <li>Stenosis (narrowing of the sleeve)</li>
                  <li>Gastroesophageal reflux disease (GERD)</li>
                  <li>Nutritional deficiencies</li>
                </ul>
                
                <h2>Recovery and Lifestyle Changes</h2>
                <p>
                  After sleeve gastrectomy, patients typically need to follow a specific diet progression, starting with clear liquids and gradually advancing to regular foods over several weeks. Long-term lifestyle changes include:
                </p>
                <ul>
                  <li>Eating smaller portions</li>
                  <li>Chewing food thoroughly</li>
                  <li>Avoiding drinking while eating</li>
                  <li>Taking vitamin and mineral supplements as recommended</li>
                  <li>Regular exercise</li>
                  <li>Regular follow-up appointments with your healthcare team</li>
                </ul>
                
                <h2>Is Sleeve Gastrectomy Right for You?</h2>
                <p>
                  Sleeve gastrectomy may be a good option if:
                </p>
                <ul>
                  <li>You have a BMI of 40 or higher (extreme obesity)</li>
                  <li>You have a BMI of 35-39.9 (obesity) and a serious weight-related health problem</li>
                  <li>You're looking for significant weight loss without the complexity of gastric bypass</li>
                  <li>You have medical conditions that make other bariatric procedures risky</li>
                </ul>
                <p>
                  It's important to discuss with your bariatric surgeon to determine if sleeve gastrectomy is the most appropriate choice for your specific situation.
                </p>
              </div>
            </div>
            
            <div className="md:w-1/3 animate-on-scroll">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-jsos-green-100 p-1 rounded-full mr-2 mt-1">
                      <div className="w-2 h-2 bg-jsos-green-600 rounded-full"></div>
                    </div>
                    <span>Removes approximately 80% of the stomach</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-jsos-green-100 p-1 rounded-full mr-2 mt-1">
                      <div className="w-2 h-2 bg-jsos-green-600 rounded-full"></div>
                    </div>
                    <span>Average weight loss: 60-70% of excess weight</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-jsos-green-100 p-1 rounded-full mr-2 mt-1">
                      <div className="w-2 h-2 bg-jsos-green-600 rounded-full"></div>
                    </div>
                    <span>Procedure time: 60-90 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-jsos-green-100 p-1 rounded-full mr-2 mt-1">
                      <div className="w-2 h-2 bg-jsos-green-600 rounded-full"></div>
                    </div>
                    <span>Hospital stay: 1-2 days</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-jsos-green-100 p-1 rounded-full mr-2 mt-1">
                      <div className="w-2 h-2 bg-jsos-green-600 rounded-full"></div>
                    </div>
                    <span>Recovery time: 2-4 weeks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-jsos-green-100 p-1 rounded-full mr-2 mt-1">
                      <div className="w-2 h-2 bg-jsos-green-600 rounded-full"></div>
                    </div>
                    <span>Non-reversible procedure</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-jsos-green-50 rounded-md">
                  <h4 className="font-semibold mb-2">Need more information?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Consult with our expert bariatric surgeons to determine if sleeve gastrectomy is right for you.
                  </p>
                  <a 
                    href="/contact" 
                    className="block text-center py-2 px-4 bg-jsos-green-600 text-white rounded-md hover:bg-jsos-green-700 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const SleeveGastrectomy = () => {
  return (
    <LanguageProvider>
      <SleeveGastrectomyContent />
    </LanguageProvider>
  );
};

export default SleeveGastrectomy;
