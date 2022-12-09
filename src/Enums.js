
// Score Type Enum

export class ScoreType {
	
	static Strokeplay = new ScoreType("Strokeplay");
	static Stableford = new ScoreType("Stableford");

	constructor(name) {
		this.name = name;
	}
}