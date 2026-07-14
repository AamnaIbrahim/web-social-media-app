// Shared by Modal, Drawer, Dropdown, Tooltip — anything that must escape
// parent overflow/z-index stacking contexts.
import { createPortal } from 'react-dom';

export default function Portal({ children }) {
  const root = document.getElementById('portal-root') ?? document.body;
  return createPortal(children, root);
}