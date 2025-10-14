import React, { useState, useEffect } from 'react';
import { useCookieConsent } from '@/contexts/CookieContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Cookie, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CookiePreferences = () => {
  const { consent, updateConsent, acceptAll, rejectAll } = useCookieConsent();
  const { toast } = useToast();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent?.analytics ?? false);
  const [marketingEnabled, setMarketingEnabled] = useState(consent?.marketing ?? false);

  useEffect(() => {
    setAnalyticsEnabled(consent?.analytics ?? false);
    setMarketingEnabled(consent?.marketing ?? false);
  }, [consent]);

  const handleSave = () => {
    updateConsent({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    });
    toast({
      title: "Preferences Saved",
      description: "Your cookie preferences have been updated successfully.",
      duration: 3000,
    });
  };

  const handleAcceptAll = () => {
    acceptAll();
    setAnalyticsEnabled(true);
    setMarketingEnabled(true);
    toast({
      title: "All Cookies Accepted",
      description: "You've accepted all cookie categories.",
      duration: 3000,
    });
  };

  const handleRejectAll = () => {
    rejectAll();
    setAnalyticsEnabled(false);
    setMarketingEnabled(false);
    toast({
      title: "Non-Essential Cookies Rejected",
      description: "Only essential cookies will be used.",
      duration: 3000,
    });
  };

  const lastUpdated = consent?.timestamp
    ? new Date(consent.timestamp).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Never';

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-2 border-brand-slate-blue/20">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="bg-brand-slate-blue/10 p-3 rounded-full">
              <Cookie className="h-6 w-6 text-brand-slate-blue" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl font-serif text-brand-charcoal mb-2">
                Cookie Preferences
              </CardTitle>
              <CardDescription className="text-brand-gray-600">
                Manage your cookie preferences and control how we use cookies on our website. Your preferences are saved locally and will expire after 12 months.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-brand-gray-600">
            <Info className="h-4 w-4" />
            <span>Last updated: <strong>{lastUpdated}</strong></span>
          </div>
        </CardContent>
      </Card>

      {/* Essential Cookies */}
      <Card className="border-2 border-brand-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-brand-charcoal mb-2 flex items-center gap-2">
                Essential Cookies
                <span className="text-xs font-normal bg-brand-slate-blue text-white px-2 py-1 rounded">
                  Always Active
                </span>
              </CardTitle>
              <CardDescription className="text-brand-gray-600">
                These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
              </CardDescription>
            </div>
            <Switch
              id="essential"
              checked={true}
              disabled
              className="flex-shrink-0"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-brand-off-white/50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-brand-charcoal mb-2">What we use these for:</h4>
            <ul className="text-sm text-brand-gray-600 space-y-1 list-disc list-inside">
              <li>User authentication and session management</li>
              <li>Shopping cart functionality and checkout process</li>
              <li>Security and fraud prevention</li>
              <li>Remembering your cookie preferences</li>
              <li>Site navigation and accessibility features</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Cookies */}
      <Card className="border-2 border-brand-gray-200 hover:border-brand-slate-blue/30 transition-colors">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-brand-charcoal mb-2">
                Analytics Cookies
              </CardTitle>
              <CardDescription className="text-brand-gray-600">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.
              </CardDescription>
            </div>
            <Switch
              id="analytics"
              checked={analyticsEnabled}
              onCheckedChange={setAnalyticsEnabled}
              className="flex-shrink-0"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-brand-off-white/50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-brand-charcoal mb-2">What we use these for:</h4>
            <ul className="text-sm text-brand-gray-600 space-y-1 list-disc list-inside">
              <li>Understanding which pages and features are most popular</li>
              <li>Tracking user behavior patterns (anonymized)</li>
              <li>Identifying technical issues and errors</li>
              <li>Measuring website performance and load times</li>
              <li>Improving user experience based on data insights</li>
            </ul>
            <p className="text-xs text-brand-gray-500 mt-3">
              <strong>Tools we use:</strong> Google Analytics (anonymized IP addresses)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Marketing Cookies */}
      <Card className="border-2 border-brand-gray-200 hover:border-brand-slate-blue/30 transition-colors">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-brand-charcoal mb-2">
                Marketing Cookies
              </CardTitle>
              <CardDescription className="text-brand-gray-600">
                These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for individual users, thereby making them more valuable for publishers and third-party advertisers.
              </CardDescription>
            </div>
            <Switch
              id="marketing"
              checked={marketingEnabled}
              onCheckedChange={setMarketingEnabled}
              className="flex-shrink-0"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-brand-off-white/50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-brand-charcoal mb-2">What we use these for:</h4>
            <ul className="text-sm text-brand-gray-600 space-y-1 list-disc list-inside">
              <li>Showing you relevant advertisements on other websites</li>
              <li>Measuring the effectiveness of our advertising campaigns</li>
              <li>Building marketing audiences for retargeting</li>
              <li>Tracking conversion rates from ads to bookings</li>
              <li>Personalizing marketing content based on interests</li>
            </ul>
            <p className="text-xs text-brand-gray-500 mt-3">
              <strong>Tools we use:</strong> Facebook Pixel, Google Ads Conversion Tracking
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          onClick={handleRejectAll}
          className="flex-1"
        >
          Reject All Non-Essential
        </Button>
        <Button
          variant="secondary"
          onClick={handleAcceptAll}
          className="flex-1"
        >
          Accept All
        </Button>
        <Button
          onClick={handleSave}
          className="flex-1 sm:flex-[1.5]"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Save My Preferences
        </Button>
      </div>

      {/* Additional Info */}
      <Card className="bg-brand-slate-blue/5 border-brand-slate-blue/20">
        <CardContent className="pt-6">
          <h4 className="text-sm font-semibold text-brand-charcoal mb-2">Need more information?</h4>
          <p className="text-sm text-brand-gray-600 leading-relaxed">
            For detailed information about how we use cookies and protect your privacy, please read our{' '}
            <a href="/privacy" className="text-brand-slate-blue hover:underline font-medium">
              Privacy Policy
            </a>
            . If you have any questions about our cookie policy, please{' '}
            <a href="/contact" className="text-brand-slate-blue hover:underline font-medium">
              contact us
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookiePreferences;
