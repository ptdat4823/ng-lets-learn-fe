const iconKeys = [
  'account_circle',
  'add_circle',
  'calendar_today',
  'calendar_month',
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
  'chevron_left',
  'chevron_right',
  'reply',
  'more_vert',
  'send',
  'task_alt',
  'circle',
  'flag_2',
  'timer',
  'hourglass',
  'hdr_strong',
  'crop_7_5',
  'list',
  'filter_alt',
  'view_column_2',
  'vital_signs',
  'close',
  'check',
  'cloud_upload',
  'attach_file',
  'logout',
  'hide',
  'open_in_full',
  'cancel',
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
