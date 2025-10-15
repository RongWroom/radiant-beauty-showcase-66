import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '@/contexts/CookieContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Cookie, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const { hasConsented, consent, acceptAll, rejectAll, updateConsent } = useCookieConsent();
  const [showBanner, setShowBanner] = useState(!hasConsented);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent?.analytics ?? false);
  const [marketingEnabled, setMarketingEnabled] = useState(consent?.marketing ?? false);

  // Sync showBanner with hasConsented to handle async localStorage loading
  useEffect(() => {
    setShowBanner(!hasConsented);
  }, [hasConsented]);

  if (!showBanner) return null;

  const handleAcceptAll = () => {
    acceptAll();
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    updateConsent({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    });
    setShowPreferences(false);
    setShowBanner(false);
  };

  const handleManagePreferences = () => {
    setAnalyticsEnabled(consent?.analytics ?? false);
    setMarketingEnabled(consent?.marketing ?? false);
    setShowPreferences(true);
  };

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-brand-slate-blue shadow-2xl animate-in slide-in-from-bottom duration-500">
        <div className="container-custom py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Icon and Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-brand-slate-blue/10 p-3 rounded-full flex-shrink-0">
                <Cookie className="h-6 w-6 text-brand-slate-blue" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-brand-charcoal mb-2">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-brand-gray-600 leading-relaxed">
                  We use cookies to ensure the best experience on our website. Essential cookies are required for site functionality, whilst analytics and marketing cookies help us improve our services. You can manage your preferences at any time.{' '}
                  <Link to="/privacy" className="text-brand-slate-blue hover:underline font-medium">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleManagePreferences}
                className="w-full sm:w-auto whitespace-nowrap"
              >
                <Settings className="mr-2 h-4 w-4" />
                Manage Preferences
              </Button>
              <Button
                variant="ghost"
                onClick={handleRejectAll}
                className="w-full sm:w-auto"
              >
                Reject All
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-brand-charcoal">
              Cookie Preferences
            </DialogTitle>
            <DialogDescription className="text-brand-gray-600">
              Choose which cookies you'd like to accept. You can change these settings at any time via the footer link.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="border-2 border-brand-gray-200 rounded-lg p-4 bg-brand-off-white/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="essential" className="text-base font-semibold text-brand-charcoal mb-2 block">
                    Essential Cookies
                    <span className="ml-2 text-xs font-normal bg-brand-slate-blue text-white px-2 py-1 rounded">
                      Always Active
                    </span>
                  </Label>
                  <p className="text-sm text-brand-gray-600 leading-relaxed">
                    Required for the website to function properly. These cookies enable core functionality such as security, authentication, shopping cart, and your preference settings. The website cannot function properly without these cookies.
                  </p>
                  <p className="text-xs text-brand-gray-500 mt-2">
                    Examples: Session authentication, cart data, security tokens
                  </p>
                </div>
                <Switch
                  id="essential"
                  checked={true}
                  disabled
                  className="flex-shrink-0"
                />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border-2 border-brand-gray-200 rounded-lg p-4 hover:border-brand-slate-blue/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="analytics" className="text-base font-semibold text-brand-charcoal mb-2 block cursor-pointer">
                    Analytics Cookies
                  </Label>
                  <p className="text-sm text-brand-gray-600 leading-relaxed">
                    Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the user experience and identify areas for enhancement.
                  </p>
                  <p className="text-xs text-brand-gray-500 mt-2">
                    Examples: Google Analytics, page view tracking, bounce rate analysis
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                  className="flex-shrink-0"
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="border-2 border-brand-gray-200 rounded-lg p-4 hover:border-brand-slate-blue/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="marketing" className="text-base font-semibold text-brand-charcoal mb-2 block cursor-pointer">
                    Marketing Cookies
                  </Label>
                  <p className="text-sm text-brand-gray-600 leading-relaxed">
                    Used to track visitors across websites to display relevant adverts and marketing campaigns. These cookies help us measure the effectiveness of our advertising and provide you with more personalised content.
                  </p>
                  <p className="text-xs text-brand-gray-500 mt-2">
                    Examples: Facebook Pixel, retargeting adverts, conversion tracking
                  </p>
                </div>
                <Switch
                  id="marketing"
                  checked={marketingEnabled}
                  onCheckedChange={setMarketingEnabled}
                  className="flex-shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowPreferences(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="flex-1"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
