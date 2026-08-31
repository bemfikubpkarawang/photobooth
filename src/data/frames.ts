export type FrameCategory =
  | 'aesthetic'
  | 'cute'
  | 'fik'
  | 'fun'
  | 'retro'
  | 'y2k';

export interface FrameSlotPoint {
  x: number;
  y: number;
}

export interface FrameSlot {
  id: number;
  points: [number, number][];
}

export interface FrameTemplate {
  id: string;
  name: string;
  category: FrameCategory;
  width: number;
  height: number;
  slot_count: number;
  slots: FrameSlot[];
}

export interface FrameData {
  id: string;
  name: string;
  displayName: string;
  category: FrameCategory;
  categoryLabel: string;
  ext: 'png' | 'jpg';
  slots: FrameSlot[];
  width: number;
  height: number;
  aspectRatio: number;

  /*
   * URL hasil build Vite untuk:
   *
   * frame_template_transparent.png
   *
   * File ini digunakan sebagai artwork/overlay
   * yang memiliki area slot transparan.
   */
  templateTransparentUrl: string;
}

/*
 * Semua frame_slots.json dibaca dari:
 *
 * src/templates/frame_templates/
 *
 * Struktur:
 *
 * frame_templates/
 * ├── aesthetic/
 * │   ├── aesthetic1/
 * │   │   ├── frame_slots.json
 * │   │   ├── frame_template_transparent.png
 * │   │   ├── template_preview.png
 * │   │   └── README.txt
 * │   ├── aesthetic2/
 * │   └── ...
 * ├── cute/
 * ├── fik/
 * ├── fun/
 * ├── retro/
 * └── y2k/
 */
const templateModules = import.meta.glob<FrameTemplate>(
  '../templates/frame_templates/*/*/frame_slots.json',
  {
    eager: true,
    import: 'default',
  }
);

/*
 * Semua frame_template_transparent.png dibaca sebagai URL
 * oleh Vite.
 */
const transparentTemplateModules = import.meta.glob<string>(
  '../templates/frame_templates/*/*/frame_template_transparent.png',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

const CATEGORY_ORDER: FrameCategory[] = [
  'aesthetic',
  'cute',
  'fik',
  'fun',
  'retro',
  'y2k',
];

const CATEGORY_LABELS_INTERNAL: Record<FrameCategory, string> = {
  aesthetic: 'Aesthetic',
  cute: 'Cute',
  fik: 'FIK',
  fun: 'Fun',
  retro: 'Retro',
  y2k: 'Y2K',
};

function getFrameNumber(name: string): number {
  const match = name.match(/(\d+)$/);

  return match
    ? Number(match[1])
    : Number.MAX_SAFE_INTEGER;
}

function getDisplayName(
  name: string,
  category: FrameCategory
): string {
  const number = getFrameNumber(name);

  if (
    Number.isFinite(number) &&
    number !== Number.MAX_SAFE_INTEGER
  ) {
    return `${CATEGORY_LABELS_INTERNAL[category]} ${number}`;
  }

  return name;
}

/*
 * Mencari frame_template_transparent.png yang sesuai
 * dengan frame_slots.json yang sedang diproses.
 *
 * Contoh:
 *
 * ../templates/frame_templates/aesthetic/aesthetic1/
 * frame_template_transparent.png
 */
function getTransparentTemplateUrl(
  template: FrameTemplate
): string {
  const expectedSuffix =
    `/${template.category}/${template.name}/frame_template_transparent.png`;

  const entry = Object.entries(
    transparentTemplateModules
  ).find(([path]) => path.endsWith(expectedSuffix));

  /*
   * Jangan membuat placeholder.
   *
   * Kalau file belum ditemukan, kembalikan string kosong.
   */
  if (!entry) {
    return '';
  }

  return entry[1];
}

function normalizeTemplate(
  template: FrameTemplate
): FrameData {
  const category = template.category;

  /*
   * FIK menggunakan JPG.
   * Kategori lainnya menggunakan PNG.
   */
  const ext: 'png' | 'jpg' =
    category === 'fik' ? 'jpg' : 'png';

  return {
    id: template.id,

    name: template.name,

    displayName: getDisplayName(
      template.name,
      category
    ),

    category,

    categoryLabel:
      CATEGORY_LABELS_INTERNAL[category],

    ext,

    width: template.width,

    height: template.height,

    aspectRatio:
      template.width / template.height,

    /*
     * Slot berasal langsung dari frame_slots.json.
     *
     * Tidak ada koordinat universal.
     */
    slots: template.slots.map(slot => ({
      id: slot.id,

      points: slot.points.map(
        point =>
          [
            Number(point[0]),
            Number(point[1]),
          ] as [number, number]
      ),
    })),

    /*
     * Template transparan milik frame ini.
     */
    templateTransparentUrl:
      getTransparentTemplateUrl(template),
  };
}

export const FRAMES: FrameData[] = Object.values(
  templateModules
)
  .map(normalizeTemplate)
  .sort((a, b) => {
    const categoryDifference =
      CATEGORY_ORDER.indexOf(a.category) -
      CATEGORY_ORDER.indexOf(b.category);

    if (categoryDifference !== 0) {
      return categoryDifference;
    }

    return (
      getFrameNumber(a.name) -
      getFrameNumber(b.name)
    );
  });

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  aesthetic: 'Aesthetic',
  cute: 'Cute',
  fik: 'FIK',
  fun: 'Fun',
  retro: 'Retro',
  y2k: 'Y2K',
};

export const CATEGORY_COLORS: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
  }
> = {
  aesthetic: {
    bg: '#FDF2F8',
    text: '#9D174D',
    border: '#FBCFE8',
  },

  cute: {
    bg: '#FFF0F3',
    text: '#BE185D',
    border: '#FDA4AF',
  },

  fik: {
    bg: '#EFF6FF',
    text: '#1E40AF',
    border: '#BFDBFE',
  },

  fun: {
    bg: '#FFFBEB',
    text: '#92400E',
    border: '#FDE68A',
  },

  retro: {
    bg: '#F5F3FF',
    text: '#5B21B6',
    border: '#DDD6FE',
  },

  y2k: {
    bg: '#F0FDF4',
    text: '#065F46',
    border: '#A7F3D0',
  },
};

/*
 * Frame artwork asli berada di:
 *
 * public/frames/
 *
 * Contoh:
 *
 * /frames/aesthetic/aesthetic1.png
 * /frames/fik/fik1.jpg
 */
export function getFrameImageUrl(
  frame: FrameData
): string {
  return `/frames/${frame.category}/${frame.name}.${frame.ext}`;
}