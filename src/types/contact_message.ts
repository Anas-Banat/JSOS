export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  title: string;
  subject: string;
  created_at: string;
  createdAt?: string; // For backward compatibility
}