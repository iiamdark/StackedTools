import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || 'https://muhhvygrzcfuyyfkfwtb.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aGh2eWdyemNmdXl5Zmtmd3RiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTEzMzE2MywiZXhwIjoyMTAwNzA5MTYzfQ.PWfAoNusmTvrRv51xCXNPv3pc7W7eqA5T_Or2MXGjyo';

const supabase = createClient(supabaseUrl, serviceKey);

// Automated articles batch for initial launch
const articlesBatch = [
  {
    title: 'Notion vs Obsidian 2026: Which Productivity Tool Wins?',
    slug: 'notion-vs-obsidian-2026',
    description: 'Detailed comparison of Notion and Obsidian for personal knowledge management, note-taking, and databases.',
    category_slug: 'productivity',
    author: 'Alex Rivera',
    published: true,
    content: `## Introduction

Choosing between **Notion** and **Obsidian** in 2026 comes down to data ownership versus cloud collaboration. Both apps have matured significantly with AI integration, local-first syncing options, and extensive plugin ecosystems.

| Feature | Notion | Obsidian |
| :--- | :--- | :--- |
| **Data Storage** | Cloud-first (Proprietary) | Local-first (Markdown) |
| **Offline Access** | Limited | 100% Native |
| **Database Views** | Tables, Boards, Timelines | Dataview Plugin / Graphs |
| **Pricing** | Free / $10 mo | Free / $4 mo Sync |

## 💡 Pro Tip: Knowledge Vault vs Team Hub
If you need real-time collaboration with team members and relational database tables, Notion is unmatched. If you value zero vendor lock-in and plain Markdown files stored on your hard drive, Obsidian is superior.

## Key Differences

### 1. Data Ownership
Obsidian stores every note as a standard \`.md\` file on your local file system. Notion holds your data in cloud databases, requiring internet access for seamless syncing.

### 2. Extensibility
Obsidian boasts over 1,500 community plugins, allowing complete UI customization. Notion offers structured database properties and formula fields built-in.

## Verdict: Which Should You Choose?
- **Choose Notion** if you need project management databases and team collaboration.
- **Choose Obsidian** if you build a personal second brain with linked notes.`
  },
  {
    title: 'Top 7 Make.com Alternatives for Automated Workflows in 2026',
    slug: 'best-make-com-alternatives-2026',
    description: 'Compare the best workflow automation platforms like Zapier, n8n, Activepieces, and Relay.app.',
    category_slug: 'automation',
    author: 'StackedTools Team',
    published: true,
    content: `## Introduction

While **Make.com** (formerly Integromat) remains a visual automation powerhouse, rising task costs and complex scenario limits have driven teams toward open-source and specialized alternatives.

| Platform | Best For | Pricing | Self-Hostable |
| :--- | :--- | :--- | :--- |
| **n8n** | Technical Teams & Devs | Free (Self-hosted) / $20 mo | ✅ Yes |
| **Zapier** | Non-technical Business Users | Free / $19.99 mo | ❌ No |
| **Activepieces** | Open-source No-Code | Free / $15 mo | ✅ Yes |
| **Relay.app** | Human-in-the-loop workflows | Free / $18 mo | ❌ No |

## Top Contenders Breakdown

### 1. n8n (Best Overall Alternative)
n8n is a fair-code workflow automation tool that lets you host your own server for free with zero execution limits.

### 2. Activepieces (Best Open-Source No-Code)
An ultra-clean, Zapier-like UI that can be deployed on Docker with a single command.

## 💡 Pro Tip: Self-Hosting Savings
By self-hosting n8n or Activepieces on a $5/month VPS (like Hetzner or DigitalOcean), you can run millions of task executions that would otherwise cost $500+/month on Zapier or Make.

## Verdict
For maximum savings and privacy, **n8n** is the clear winner for automated pipelines.`
  },
  {
    title: 'HubSpot vs Salesforce CRM: Small Business Guide 2026',
    slug: 'hubspot-vs-salesforce-small-business',
    description: 'An honest pricing and feature breakdown for small and medium business CRM selection.',
    category_slug: 'business-software',
    author: 'Alex Rivera',
    published: true,
    content: `## Introduction

Selecting the right CRM dictates your sales team's velocity. **HubSpot** emphasizes ease of use and inbound marketing, while **Salesforce** delivers unrivaled custom enterprise objects.

| Dimension | HubSpot CRM | Salesforce Sales Cloud |
| :--- | :--- | :--- |
| **Ease of Adoption** | 5/5 (Intuitive) | 3/5 (Requires Admin) |
| **Setup Time** | Days | Weeks / Months |
| **Free Tier** | Generous CRM Free | 14-day Trial Only |
| **Starting Price** | $20/mo/user | $25/mo/user |

## Key Differences

### 1. Ease of Use
HubSpot can be set up in an afternoon by a sales manager. Salesforce almost always requires a certified administrator or consultant.

### 2. Scalability & Customization
Salesforce allows deep Apex coding, custom objects, and complex permission hierarchies suited for enterprise sales reps.

## Verdict
- **Pick HubSpot** if you want fast adoption and integrated marketing hubs.
- **Pick Salesforce** if you have complex corporate governance and dedicated IT resources.`
  }
];

async function publishBatch() {
  console.log('🚀 Launching Automated Content Pipeline to Supabase Database...');
  for (const article of articlesBatch) {
    const { data, error } = await supabase
      .from('posts')
      .upsert([article], { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`❌ Error publishing "${article.title}":`, error.message);
    } else {
      console.log(`✅ Published Article: "${article.title}" [${article.category_slug}]`);
    }
  }
  console.log('✨ Batch publication completed successfully!');
}

publishBatch();
