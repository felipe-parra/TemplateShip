import { getCompanyConfig, getMailgunConfig } from '@/lib/site-config';

// Backward compatibility: export config using the new centralized configuration
const companyConfig = getCompanyConfig();
const mailgunConfig = getMailgunConfig();

export const config = {
  appName: companyConfig.name,
  domainName: companyConfig.domain,
  mailgun: mailgunConfig || {
    subdomain: "mg",
    fromNoReply: `ShipFree <noreply@ag.shipfree.com>`,
    fromAdmin: `Idee8 at ShipFree <idee8@ag.shipfree.com>`,
    supportEmail: "idee8@mg.shipfree.com",
    forwardRepliesTo: "shipfree@gmail.com",
  },
};
