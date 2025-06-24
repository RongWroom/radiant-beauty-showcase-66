
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AdminNotesSectionProps {
  adminNotes: string;
  setAdminNotes: (notes: string) => void;
  onSaveNotes: () => void;
  updating: boolean;
}

const AdminNotesSection: React.FC<AdminNotesSectionProps> = ({
  adminNotes,
  setAdminNotes,
  onSaveNotes,
  updating
}) => {
  return (
    <div className="mt-6">
      <Label htmlFor="admin-notes" className="text-lg font-semibold">
        Admin Notes
      </Label>
      <Textarea
        id="admin-notes"
        placeholder="Add internal notes about this appointment..."
        value={adminNotes}
        onChange={(e) => setAdminNotes(e.target.value)}
        className="mt-2"
        rows={4}
      />
      <Button 
        onClick={onSaveNotes} 
        variant="outline" 
        className="mt-2"
        disabled={updating}
      >
        {updating ? 'Saving...' : 'Save Notes'}
      </Button>
    </div>
  );
};

export default AdminNotesSection;
