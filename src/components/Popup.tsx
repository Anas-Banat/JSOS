import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] p-0 overflow-hidden"
        style={{ overflowY: 'auto' }} 
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-center text-jsos-green-700">
            {t('navFifthCongress')}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full px-6 pb-6">
          <img
            src="/images/congress/5th-congress.jpeg"
            alt={t('navFifthCongress')}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;