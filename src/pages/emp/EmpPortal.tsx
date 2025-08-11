"use client";


import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "../../components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';


const Login = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      if (user) { 
        navigate("/dashboard");
      }
    }, [useAuth, navigate]);

  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
  
      const form = e.currentTarget.form;
      if (form) {
        const index = Array.from(form.elements).indexOf(e.currentTarget);
        if (index >= 0 && index < form.elements.length - 1) {
          (form.elements[index + 1] as HTMLElement).focus();
        }
      }
    }
  };

  return (
    <main dir={language === "ar" ? "rtl" : "ltr"}>
      <h1 className="section-title text-2xl font-bold text-jsos-green-700 mb-8 lg:text-[30px]">{t('navBilioPancreatic')}</h1>
      <div className="container ">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
                <section className=" py-14 lg:py-20">
                    <div className="container">
                        <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div
                            className="bg-[#F4F7FF] wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
                            data-wow-delay=".15s"
                            >
                            <div className="mb-10 text-center">
                                <Link to ="/" className="mx-auto inline-block max-w-[160px]">
                                <img
                                    src='/images/logo/jma-removebg.png'
                                    alt="logo"
                                    width={140}
                                    height={30}
                                    className="dark:hidden"
                                />
                                <img
                                    src="/images/logo/jma_white_logo.png"
                                    alt="logo"
                                    width={140}
                                    height={30}
                                    className="hidden dark:block"
                                />
                                </Link>
                            </div>
                            
                                <form onSubmit={handleSubmit}>
                                <div className="mb-[22px]">
                                    <input
                                    autoFocus
                                    type="text"
                                    id="email"
                                    value={email}
                                    required
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={language === "ar" ? "اسم المستخدم:" : "Username:"}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-[22px]">
                                    <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    required
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={language === "ar" ? "كلمة المرور" : "Password"}
                                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                { error && <p className="text-red-500">{error}</p>}
                                <div className="mb-9">
                                    <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-primary/90"
                                    >
                                    {language === "ar" ? "تسجيل الدخول" : "Login"}
                                    </Button>
                                </div>
                              </form>
                            <div>
                                <span className="absolute right-1 top-1">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                    cx="1.39737"
                                    cy="38.6026"
                                    r="1.39737"
                                    transform="rotate(-90 1.39737 38.6026)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="1.39737"
                                    cy="1.99122"
                                    r="1.39737"
                                    transform="rotate(-90 1.39737 1.99122)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="13.6943"
                                    cy="38.6026"
                                    r="1.39737"
                                    transform="rotate(-90 13.6943 38.6026)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="13.6943"
                                    cy="1.99122"
                                    r="1.39737"
                                    transform="rotate(-90 13.6943 1.99122)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="25.9911"
                                    cy="38.6026"
                                    r="1.39737"
                                    transform="rotate(-90 25.9911 38.6026)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="25.9911"
                                    cy="1.99122"
                                    r="1.39737"
                                    transform="rotate(-90 25.9911 1.99122)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="38.288"
                                    cy="38.6026"
                                    r="1.39737"
                                    transform="rotate(-90 38.288 38.6026)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="38.288"
                                    cy="1.99122"
                                    r="1.39737"
                                    transform="rotate(-90 38.288 1.99122)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="1.39737"
                                    cy="26.3057"
                                    r="1.39737"
                                    transform="rotate(-90 1.39737 26.3057)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="13.6943"
                                    cy="26.3057"
                                    r="1.39737"
                                    transform="rotate(-90 13.6943 26.3057)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="25.9911"
                                    cy="26.3057"
                                    r="1.39737"
                                    transform="rotate(-90 25.9911 26.3057)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="38.288"
                                    cy="26.3057"
                                    r="1.39737"
                                    transform="rotate(-90 38.288 26.3057)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="1.39737"
                                    cy="14.0086"
                                    r="1.39737"
                                    transform="rotate(-90 1.39737 14.0086)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="13.6943"
                                    cy="14.0086"
                                    r="1.39737"
                                    transform="rotate(-90 13.6943 14.0086)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="25.9911"
                                    cy="14.0086"
                                    r="1.39737"
                                    transform="rotate(-90 25.9911 14.0086)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="38.288"
                                    cy="14.0086"
                                    r="1.39737"
                                    transform="rotate(-90 38.288 14.0086)"
                                    fill="#3056D3"
                                    />
                                </svg>
                                </span>
                                <span className="absolute bottom-1 left-1">
                                <svg
                                    width="29"
                                    height="40"
                                    viewBox="0 0 29 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                    cx="2.288"
                                    cy="25.9912"
                                    r="1.39737"
                                    transform="rotate(-90 2.288 25.9912)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="14.5849"
                                    cy="25.9911"
                                    r="1.39737"
                                    transform="rotate(-90 14.5849 25.9911)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="26.7216"
                                    cy="25.9911"
                                    r="1.39737"
                                    transform="rotate(-90 26.7216 25.9911)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="2.288"
                                    cy="13.6944"
                                    r="1.39737"
                                    transform="rotate(-90 2.288 13.6944)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="14.5849"
                                    cy="13.6943"
                                    r="1.39737"
                                    transform="rotate(-90 14.5849 13.6943)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="26.7216"
                                    cy="13.6943"
                                    r="1.39737"
                                    transform="rotate(-90 26.7216 13.6943)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="2.288"
                                    cy="38.0087"
                                    r="1.39737"
                                    transform="rotate(-90 2.288 38.0087)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="2.288"
                                    cy="1.39739"
                                    r="1.39737"
                                    transform="rotate(-90 2.288 1.39739)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="14.5849"
                                    cy="38.0089"
                                    r="1.39737"
                                    transform="rotate(-90 14.5849 38.0089)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="26.7216"
                                    cy="38.0089"
                                    r="1.39737"
                                    transform="rotate(-90 26.7216 38.0089)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="14.5849"
                                    cy="1.39761"
                                    r="1.39737"
                                    transform="rotate(-90 14.5849 1.39761)"
                                    fill="#3056D3"
                                    />
                                    <circle
                                    cx="26.7216"
                                    cy="1.39761"
                                    r="1.39737"
                                    transform="rotate(-90 26.7216 1.39761)"
                                    fill="#3056D3"
                                    />
                                </svg>
                                </span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                  </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
