'use client';

import { Icon } from '@iconify/react/offline';
import arrowUpRight from '@iconify-icons/lucide/arrow-up-right';
import arrowDown from '@iconify-icons/lucide/arrow-down';
import arrowLeft from '@iconify-icons/lucide/arrow-left';
import externalLink from '@iconify-icons/lucide/external-link';
import menu from '@iconify-icons/lucide/menu';
import close from '@iconify-icons/lucide/x';
import users from '@iconify-icons/lucide/users';
import calendarClock from '@iconify-icons/lucide/calendar-clock';
import mapPin from '@iconify-icons/lucide/map-pin';
import calendarCheck from '@iconify-icons/lucide/calendar-check';
import database from '@iconify-icons/lucide/database';
import clock from '@iconify-icons/lucide/clock';
import fileCheck from '@iconify-icons/lucide/file-check';
import bell from '@iconify-icons/lucide/bell';
import network from '@iconify-icons/lucide/network';
import mail from '@iconify-icons/lucide/mail';
import globe from '@iconify-icons/lucide/globe';
import shieldCheck from '@iconify-icons/lucide/shield-check';

const icons = { arrowUpRight, arrowDown, arrowLeft, externalLink, menu, close, users, calendarClock, mapPin, calendarCheck, database, clock, fileCheck, bell, network, mail, globe, shieldCheck };
export type IconName = keyof typeof icons;

// Imported icon data renders in the static HTML; no Iconify API request.
export function SiteIcon({ name, className = '', size = 20 }: { name: IconName; className?: string; size?: number }) {
  return <Icon icon={icons[name]} ssr width={size} height={size} aria-hidden="true" focusable="false" className={`site-icon ${className}`} />;
}
