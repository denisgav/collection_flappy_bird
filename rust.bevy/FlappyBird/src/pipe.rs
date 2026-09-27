use crate::constants::*;

use bevy::{prelude::*, sprite::Anchor};

#[derive(Component)]
pub struct Pipe {
    pub is_top: bool,

    // scoring
    pub bird_enter: bool,
    pub bird_exit: bool,
    pub bird_passed: bool,
}

#[derive(Component)]
pub struct PipeTop;

#[derive(Component)]
pub struct PipeBottom;