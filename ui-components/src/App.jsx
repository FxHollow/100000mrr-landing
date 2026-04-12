import { useState } from 'react';
import { Button, Card, Input, Badge, Avatar, Navigation } from './components';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>100000MRR UI Components</h1>
        <p>Component Library Documentation & Showcase</p>
      </header>

      {/* Button Component Showcase */}
      <section className="component-section">
        <h2>Button</h2>
        <p className="section-description">Interactive button with multiple variants and sizes.</p>

        <div className="showcase-grid">
          <div className="showcase-item">
            <h3>Variants</h3>
            <div className="button-row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div className="showcase-item">
            <h3>Sizes</h3>
            <div className="button-row button-sizes">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="showcase-item">
            <h3>States</h3>
            <div className="button-row">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div className="showcase-item">
            <h3>Full Width</h3>
            <Button fullWidth variant="primary">Full Width Button</Button>
          </div>
        </div>

        <div className="code-block">
          <pre>{`import { Button } from '@100000mrr/ui';

<Button variant="primary" size="md">Click Me</Button>
<Button variant="secondary" disabled>Disabled</Button>
<Button variant="ghost" fullWidth>Full Width</Button>`}</pre>
        </div>
      </section>

      {/* Card Component Showcase */}
      <section className="component-section">
        <h2>Card</h2>
        <p className="section-description">Flexible card container with optional header and footer.</p>

        <div className="showcase-grid">
          <div className="showcase-item">
            <h3>Basic Card</h3>
            <Card>
              <p>This is a basic card with just body content.</p>
            </Card>
          </div>

          <div className="showcase-item">
            <h3>Card with Header & Footer</h3>
            <Card
              header={<strong>Card Title</strong>}
              footer={<Button size="sm" variant="primary">Action</Button>}
            >
              <p>Card with header and footer sections.</p>
            </Card>
          </div>

          <div className="showcase-item">
            <h3>Hoverable Card</h3>
            <Card hoverable>
              <p>Hover over this card to see the effect.</p>
            </Card>
          </div>
        </div>

        <div className="code-block">
          <pre>{`import { Card } from '@100000mrr/ui';

<Card hoverable>
  <p>Card content here</p>
</Card>

<Card
  header={<h3>Title</h3>}
  footer={<Button>Action</Button>}
>
  <p>Card with header and footer</p>
</Card>`}</pre>
        </div>
      </section>

      {/* Input Component Showcase */}
      <section className="component-section">
        <h2>Input</h2>
        <p className="section-description">Form input with label, placeholder, and error states.</p>

        <div className="showcase-grid">
          <div className="showcase-item">
            <h3>Text Input</h3>
            <Input
              type="text"
              placeholder="Enter text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
            />
          </div>

          <div className="showcase-item">
            <h3>Input with Label</h3>
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              fullWidth
            />
          </div>

          <div className="showcase-item">
            <h3>Error State</h3>
            <Input
              type="text"
              label="Username"
              error="This field is required"
              fullWidth
            />
          </div>

          <div className="showcase-item">
            <h3>Disabled State</h3>
            <Input
              type="text"
              label="Disabled Input"
              value="Cannot edit this"
              disabled
              fullWidth
            />
          </div>

          <div className="showcase-item">
            <h3>Textarea</h3>
            <Input
              type="textarea"
              label="Message"
              placeholder="Type your message..."
              fullWidth
            />
          </div>
        </div>

        <div className="code-block">
          <pre>{`import { Input } from '@100000mrr/ui';

<Input
  type="text"
  label="Name"
  placeholder="Enter your name"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

<Input
  type="email"
  label="Email"
  error="Invalid email address"
/>

<Input type="textarea" label="Message" rows={4} />`}</pre>
        </div>
      </section>

      {/* Badge Component Showcase */}
      <section className="component-section">
        <h2>Badge</h2>
        <p className="section-description">Small status or category indicators.</p>

        <div className="showcase-grid">
          <div className="showcase-item">
            <h3>Variants</h3>
            <div className="badge-row">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </div>

          <div className="showcase-item">
            <h3>Sizes</h3>
            <div className="badge-row">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
            </div>
          </div>

          <div className="showcase-item">
            <h3>Usage Examples</h3>
            <div className="badge-examples">
              <Card hoverable>
                <div className="badge-example">
                  <span>Status:</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="badge-example">
                  <span>Priority:</span>
                  <Badge variant="warning">High</Badge>
                </div>
                <div className="badge-example">
                  <span>Errors:</span>
                  <Badge variant="danger">3 Issues</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="code-block">
          <pre>{`import { Badge } from '@100000mrr/ui';

<Badge variant="success">Active</Badge>
<Badge variant="warning" size="sm">Pending</Badge>
<Badge variant="danger">Error</Badge>`}</pre>
        </div>
      </section>

      {/* Avatar Component Showcase */}
      <section className="component-section">
        <h2>Avatar</h2>
        <p className="section-description">User avatar with image or initials fallback.</p>

        <div className="showcase-grid">
          <div className="showcase-item">
            <h3>Sizes</h3>
            <div className="avatar-row">
              <Avatar name="John Doe" size="sm" />
              <Avatar name="Jane Smith" size="md" />
              <Avatar name="Bob Wilson" size="lg" />
            </div>
          </div>

          <div className="showcase-item">
            <h3>With Image</h3>
            <div className="avatar-row">
              <Avatar
                src="https://i.pravatar.cc/100?img=1"
                alt="User 1"
                size="md"
              />
              <Avatar
                src="https://i.pravatar.cc/100?img=2"
                alt="User 2"
                size="md"
              />
              <Avatar
                src="https://i.pravatar.cc/100?img=3"
                alt="User 3"
                size="md"
              />
            </div>
          </div>

          <div className="showcase-item">
            <h3>Avatar Group</h3>
            <div className="avatar-group">
              <Avatar name="Alice" size="md" />
              <Avatar name="Bob" size="md" />
              <Avatar name="Charlie" size="md" />
              <Avatar name="Diana" size="md" />
            </div>
          </div>
        </div>

        <div className="code-block">
          <pre>{`import { Avatar } from '@100000mrr/ui';

// With initials fallback
<Avatar name="John Doe" size="md" />

// With image
<Avatar
  src="https://example.com/avatar.jpg"
  alt="User name"
  size="lg"
/>

// Avatar Group
<div className="avatar-group">
  <Avatar name="Alice" />
  <Avatar name="Bob" />
  <Avatar name="Charlie" />
</div>`}</pre>
        </div>
      </section>

      {/* Navigation Component Showcase */}
      <section className="component-section">
        <h2>Navigation</h2>
        <p className="section-description">Responsive navigation bar with horizontal and vertical layouts.</p>

        <div className="showcase-grid">
          <div className="showcase-item">
            <h3>Horizontal Navigation</h3>
            <Navigation
              variant="horizontal"
              logo={<span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Logo</span>}
              items={[
                { label: 'Home', href: '/', active: true },
                { label: 'Products', href: '/products' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ]}
            />
          </div>

          <div className="showcase-item">
            <h3>With Right Content</h3>
            <Navigation
              variant="horizontal"
              logo={<span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Logo</span>}
              items={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Settings', href: '/settings' },
              ]}
              rightContent={
                <Button size="sm" variant="primary">Sign In</Button>
              }
            />
          </div>

          <div className="showcase-item">
            <h3>Vertical Navigation (Sidebar)</h3>
            <div style={{ height: '300px', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
              <Navigation
                variant="vertical"
                logo={<span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Logo</span>}
                items={[
                  { label: 'Overview', href: '/overview', active: true },
                  { label: 'Analytics', href: '/analytics' },
                  { label: 'Reports', href: '/reports' },
                  { label: 'Settings', href: '/settings' },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="code-block">
          <pre>{`import { Navigation } from '@100000mrr/ui';

// Horizontal Navigation
<Navigation
  variant="horizontal"
  logo={<img src="/logo.svg" alt="Logo" />}
  items={[
    { label: 'Home', href: '/', active: true },
    { label: 'Products', href: '/products' },
  ]}
  rightContent={<Button>Sign In</Button>}
/>

// Vertical Navigation (Sidebar)
<Navigation
  variant="vertical"
  logo={<span>Logo</span>}
  items={[
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Settings', href: '/settings' },
  ]}
/>`}</pre>
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <p>100000MRR UI Component Library v1.0</p>
        <p>Built with React + Vite + Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
