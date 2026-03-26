# 100000MRR UI Components

A lightweight React component library built with Vite and Tailwind CSS.

## Installation

```bash
npm install
npm run dev
```

## Components

### Button

Interactive button with multiple variants and sizes.

```jsx
import { Button } from './components';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Button color variant |
| size | string | 'md' | Button size |
| disabled | boolean | false | Disabled state |
| fullWidth | boolean | false | Take full width |
| type | string | 'button' | HTML button type |
| onClick | function | - | Click handler |
| children | ReactNode | - | Button content |

---

### Card

Flexible card container with optional header and footer.

```jsx
import { Card } from './components';

// Basic card
<Card>
  <p>Card content</p>
</Card>

// With header and footer
<Card
  header={<h3>Card Title</h3>}
  footer={<Button>Action</Button>}
>
  <p>Card content</p>
</Card>

// Hoverable
<Card hoverable>
  <p>Hover me</p>
</Card>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| header | ReactNode | - | Header content |
| footer | ReactNode | - | Footer content |
| hoverable | boolean | false | Enable hover effect |
| children | ReactNode | - | Card body content |

---

### Input

Form input with label, placeholder, and error states.

```jsx
import { Input } from './components';

// Basic input
<Input
  type="text"
  placeholder="Enter text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// With label
<Input
  type="email"
  label="Email Address"
  placeholder="you@example.com"
/>

// Error state
<Input
  type="text"
  label="Username"
  error="This field is required"
/>

// Textarea
<Input
  type="textarea"
  label="Message"
  rows={4}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | string | 'text' | Input type (text, email, password, textarea) |
| value | string | - | Input value |
| onChange | function | - | Change handler |
| label | string | - | Input label |
| placeholder | string | - | Placeholder text |
| error | string | - | Error message |
| disabled | boolean | false | Disabled state |
| fullWidth | boolean | false | Take full width |

---

### Badge

Small status or category indicators.

```jsx
import { Badge } from './components';

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'default' | Badge color variant |
| size | string | 'md' | Badge size |
| children | ReactNode | - | Badge content |

---

### Avatar

User avatar with image or initials fallback.

```jsx
import { Avatar } from './components';

// With initials
<Avatar name="John Doe" size="md" />

// With image
<Avatar
  src="https://example.com/avatar.jpg"
  alt="User name"
  size="lg"
/>

// Avatar group
<div className="avatar-group">
  <Avatar name="Alice" />
  <Avatar name="Bob" />
  <Avatar name="Charlie" />
</div>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | - | Image URL |
| alt | string | '' | Alt text for image |
| name | string | - | Name for initials fallback |
| size | string | 'md' | Avatar size (sm, md, lg) |

---

## Development

### Project Structure

```
ui-components/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   ├── Card.jsx
│   │   ├── Card.css
│   │   ├── Input.jsx
│   │   ├── Input.css
│   │   ├── Badge.jsx
│   │   ├── Badge.css
│   │   ├── Avatar.jsx
│   │   ├── Avatar.css
│   │   └── index.js
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── package.json
└── README.md
```

### Running Locally

```bash
npm run dev
```

Open `http://localhost:5173` to view the component showcase.

### Building for Production

```bash
npm run build
```

---

## License

MIT - 100000MRR
