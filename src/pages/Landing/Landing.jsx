import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Compass, Bookmark, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import { ROUTES } from '@/constants/routes';

const features = [
  { icon: Heart, title: 'Likes & saves', desc: 'Show love or bookmark for later. Every post remembers you.' },
  { icon: MessageCircle, title: 'Real conversations', desc: 'Threads under posts, DMs when you want to go deeper.' },
  { icon: Compass, title: 'Explore, gently', desc: 'Trending topics and suggested people — never overwhelming.' },
  { icon: Bookmark, title: 'Your saved shelf', desc: 'A private grid of the posts you keep coming back to.' },
  { icon: Users, title: 'Follow who you like', desc: 'Chronological feed of the accounts you actually chose.' },
  { icon: Shield, title: 'Local-first', desc: 'Your posts, likes and saves live in your browser storage.' },
];

const previewPosts = [
  { name: 'Aamna Ibrahim', text: 'Sunrise this morning. Nothing beats this light.', likes: 24, comments: 6, hasImage: true },
  { name: 'Bilal Qureshi', text: 'Shipping is a feature. Reminder to self as I close 14 tabs.', likes: 24, comments: 6, hasImage: false },
  { name: 'Madeeha', text: 'Type study — a stricter modular scale this week.', likes: 24, comments: 6, hasImage: true },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-20 pb-24 text-center overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background: 'radial-gradient(circle at 50% 0%, var(--color-accent-subtle), transparent 60%)',
          }}
        />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.4 }}>
          <Badge variant="accent" className="inline-flex items-center gap-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Now in public preview
          </Badge>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight max-w-3xl mx-auto"
        >
          A calmer place to <span className="text-accent">share</span> what matters.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg text-text-secondary max-w-xl mx-auto mt-6"
        >
          hue is a modern social feed for photos, thoughts and small talk. No algorithms shouting at you —
          just the people you follow, in order.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center justify-center gap-3 mt-9"
        >
          <Link to={ROUTES.REGISTER}>
            <Button size="lg">Get started</Button>
          </Link>
          <Link to={ROUTES.LOGIN}>
            <Button size="lg" variant="secondary">Log in</Button>
          </Link>
        </motion.div>
      </section>

      {/* Preview */}
      <section id="preview" className="pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="card !p-6 sm:!p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewPosts.map((post) => (
              <Card key={post.name} hoverable={false} className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <Avatar name={post.name} size="sm" />
                  <p className="text-sm font-semibold text-text-primary">{post.name}</p>
                </div>
                <p className="text-sm text-text-secondary">{post.text}</p>
                {post.hasImage && (
                  <div className="w-full aspect-video rounded-md bg-bg-inset" />
                )}
                <div className="flex items-center gap-4 text-text-tertiary text-xs pt-1">
                  <span className="flex items-center gap-1"><Heart size={14} strokeWidth={1.75} /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={14} strokeWidth={1.75} /> {post.comments}</span>
                  <Bookmark size={14} strokeWidth={1.75} className="ml-auto" />
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="pb-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl font-bold text-text-primary max-w-2xl mx-auto"
        >
          Everything you'd expect. Nothing you don't.
        </motion.h2>
        <p className="text-text-secondary mt-3 max-w-lg mx-auto">
          The pieces that make a social app feel like home — thoughtfully arranged.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 text-left">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full">
                <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center mb-4">
                  <Icon size={18} strokeWidth={1.75} className="text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1.5">{title}</h3>
                <p className="text-sm text-text-secondary">{desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values / CTA */}
      <section id="values" className="pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-gradient-to-br from-accent to-accent-hover text-text-inverse px-8 py-16 sm:py-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Ready when you are.</h2>
          <p className="opacity-90 max-w-md mx-auto mt-3">
            Join the demo or make an account in seconds. Bring your camera roll and your quiet thoughts.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <Link to={ROUTES.REGISTER}>
              <Button size="lg" className="!bg-white !text-text-primary hover:!bg-white/90">
                Create account
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button size="lg" variant="ghost" className="!text-text-inverse hover:!bg-white/10">
                I already have one
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-tertiary">
        <span>hue · © 2026</span>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-text-secondary">Privacy</Link>
          <Link to="/terms" className="hover:text-text-secondary">Terms</Link>
          <Link to="/guidelines" className="hover:text-text-secondary">Guidelines</Link>
          <Link to="/contact" className="hover:text-text-secondary">Contact</Link>
        </div>
      </footer>
    </div>
  );
}