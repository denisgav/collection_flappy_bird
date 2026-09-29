#[derive(Debug, Clone, Copy)]
pub struct FBRect {
    pub left: f32,
    pub right: f32,
    pub top: f32,
    pub bottom: f32,
}

impl FBRect {
    pub fn intersects(&self, other: &FBRect) -> bool {
        self.left < other.right
            && self.right > other.left
            && self.top > other.bottom
            && self.bottom < other.top
    }
}