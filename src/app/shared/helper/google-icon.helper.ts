const iconKeys = [
  'account_circle',
  'add_circle',
  'calendar_today',
  'chat_bubble',
  'checkbook',
  'group',
  'home',
  'image',
  'lock',
  'mail',
  'menu',
  'person',
  'share',
  'visibility',
  'visibility_off',
  'videocam',
  'upload_file',
  'docs',
  'checklist',
  'article',
  'arrow_back',
  'keyboard_arrow_down',
  'settings',
  'stylus',
  'content_copy',
  'save',
  'check_circle',
  'delete',
  'unfold_more',
];
const baseGoogleIconLink =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';

const generateGoogleIconLink = (
  baseUrl: string,
  iconKeys: string[]
): string => {
  const iconsParam = [...iconKeys].sort().join(',');
  return `${baseUrl}&icon_names=${iconsParam}`;
};

export const GOOGLE_ICON_LINK = generateGoogleIconLink(
  baseGoogleIconLink,
  iconKeys
);
