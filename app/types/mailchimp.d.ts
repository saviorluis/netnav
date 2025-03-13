declare module '@mailchimp/mailchimp_marketing' {
  interface MailchimpClient {
    setConfig(config: { apiKey: string; server: string }): void;
    lists: {
      addListMember(
        listId: string,
        data: {
          email_address: string;
          status: string;
          merge_fields?: Record<string, any>;
          tags?: string[];
        }
      ): Promise<{ id: string }>;
      updateListMember(
        listId: string,
        subscriberId: string,
        data: {
          merge_fields?: Record<string, any>;
        }
      ): Promise<{ id: string }>;
    };
  }

  const mailchimp: MailchimpClient;
  export default mailchimp;
} 