import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize the Mailchimp client
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export interface SubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
}

export class MailchimpService {
  static async addSubscriber(data: SubscriberData) {
    try {
      const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
        email_address: data.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: data.firstName || '',
          LNAME: data.lastName || '',
        },
        tags: ['Network Navigator', 'Web App'],
      });

      return {
        success: true,
        id: response.id,
      };
    } catch (error: any) {
      console.error('Mailchimp subscription error:', error);
      
      // Handle already subscribed users gracefully
      if (error.response && error.response.body.title === 'Member Exists') {
        return {
          success: false,
          error: 'This email is already subscribed.',
        };
      }

      return {
        success: false,
        error: 'Failed to subscribe. Please try again later.',
      };
    }
  }

  static async updateSubscriber(subscriberId: string, data: Partial<SubscriberData>) {
    try {
      const response = await mailchimp.lists.updateListMember(
        process.env.MAILCHIMP_LIST_ID!,
        subscriberId,
        {
          merge_fields: {
            FNAME: data.firstName,
            LNAME: data.lastName,
          },
        }
      );

      return {
        success: true,
        id: response.id,
      };
    } catch (error) {
      console.error('Mailchimp update error:', error);
      return {
        success: false,
        error: 'Failed to update subscriber information.',
      };
    }
  }
} 