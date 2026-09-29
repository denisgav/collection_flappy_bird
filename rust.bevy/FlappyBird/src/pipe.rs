use crate::constants::*;
use crate::fbrect::*;

use bevy::{prelude::*};

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

pub fn get_pipe_rect(
    pos_x: &f32,
    pos_y: &f32,
) -> FBRect {
    let half_w =
        RESOURCE_PIPE_WIDTH as f32 / 2.0;

    let half_h =
        RESOURCE_PIPE_HEIGHT as f32 / 2.0;

    return FBRect {
        left: pos_x - half_w,
        right: pos_x + half_w,
        top: pos_y + half_h,
        bottom: pos_y - half_h,
    };
}