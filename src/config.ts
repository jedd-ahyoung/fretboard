import { generateLookup, pitchClass } from "./constants";

// TODO: Move.
export const instruments = {
	bass_EADG: [
		{ note: 'E', offset: 0, octave: 1, frets: 24 },
		{ note: 'A', offset: 0, octave: 1, frets: 24 },
		{ note: 'D', offset: 0, octave: 2, frets: 24 },
		{ note: 'G', offset: 0, octave: 2, frets: 24 },
	],
	bass_BEADG: [
		{ note: 'B', offset: 0, octave: 0, frets: 24 },
		{ note: 'E', offset: 0, octave: 1, frets: 24 },
		{ note: 'A', offset: 0, octave: 1, frets: 24 },
		{ note: 'D', offset: 0, octave: 2, frets: 24 },
		{ note: 'G', offset: 0, octave: 2, frets: 24 },
	],
	bass_BEADGC: [
		{ note: 'B', offset: 0, octave: 0, frets: 24 },
		{ note: 'E', offset: 0, octave: 1, frets: 24 },
		{ note: 'A', offset: 0, octave: 1, frets: 24 },
		{ note: 'D', offset: 0, octave: 2, frets: 24 },
		{ note: 'G', offset: 0, octave: 2, frets: 24 },
		{ note: 'C', offset: 0, octave: 3, frets: 24 },
	],
	cello_CDGA: [
		{ note: 'C', offset: 0, octave: 2, frets: 24 },
		{ note: 'G', offset: 0, octave: 2, frets: 24 },
		{ note: 'D', offset: 0, octave: 3, frets: 24 },
		{ note: 'A', offset: 0, octave: 3, frets: 24 },
	],
	guitar_EADGBE: [
		{ note: 'E', offset: 0, octave: 2, frets: 24 },
		{ note: 'A', offset: 0, octave: 2, frets: 24 },
		{ note: 'D', offset: 0, octave: 3, frets: 24 },
		{ note: 'G', offset: 0, octave: 3, frets: 24 },
		{ note: 'B', offset: 0, octave: 3, frets: 24 },
		{ note: 'E', offset: 0, octave: 4, frets: 24 },
	],
	guitar_DADGAD: [
		{ note: 'D', offset: 0, octave: 2, frets: 24 },
		{ note: 'A', offset: 0, octave: 2, frets: 24 },
		{ note: 'D', offset: 0, octave: 3, frets: 24 },
		{ note: 'G', offset: 0, octave: 3, frets: 24 },
		{ note: 'A', offset: 0, octave: 3, frets: 24 },
		{ note: 'D', offset: 0, octave: 4, frets: 24 },
	]
};

// TODO: Generate this from a configuration function for later use.
export const config = {
	strings: instruments.guitar_EADGBE.slice(),
	sharps: true,
	flats: true,
	activeNotes: pitchClass.slice()
};

/**
 * Generate octaves down to A0 (we start at octave 4 by default, hence the negative numbers).
 */
export const lookup = [-4, -3, -2, -1, 0, 1, 2, 3]
	.map(generateLookup)
	.reduce((p, c) => p.concat(c));

lookup.forEach(x => {
	console.log(x.note, x.octave, x.pitch);
});

export const createStringRanges = () => {
	return config.strings
		.map(x => {
			const start = lookup.findIndex(y => y.note === x.note && y.octave === x.octave);
			return {
				note: x.note,
				octave: x.octave,
				frets: x.frets,
				offset: x.offset,
				range: lookup.slice(start, start + x.frets + 1)
			};
		});
};

export const getActiveNotes = () => {
	return config.activeNotes;
}