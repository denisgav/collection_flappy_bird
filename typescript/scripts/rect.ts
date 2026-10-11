export class Rect {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {}

    get left(): number {
        return this.x;
    }

    get right(): number {
        return this.x + this.width;
    }

    get top(): number {
        return this.y;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    get centerX(): number {
        return this.x + this.width / 2;
    }

    get centerY(): number {
        return this.y + this.height / 2;
    }

    set centerX(value: number) {
        this.x = value - this.width / 2;
    }

    set centerY(value: number) {
        this.y = value - this.height / 2;
    }

    intersects(other: Rect): boolean {
        return (
            this.left < other.right &&
            this.right > other.left &&
            this.top < other.bottom &&
            this.bottom > other.top
        );
    }

    containsPoint(x: number, y: number): boolean {
        return (
            x >= this.left &&
            x <= this.right &&
            y >= this.top &&
            y <= this.bottom
        );
    }
}