import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  Float32BufferAttribute,
  PlaneGeometry,
  RingGeometry,
  Shape,
  ShapeGeometry,
  TorusGeometry,
} from "three";

/**
 * Lightweight stand-in for the production GLB, built from a handful of primitives (~40 draw calls).
 * Profiles are drawn in the side plane: shape X = car Z (nose at +Z), shape Y = height.
 */

const GROUND_CLEARANCE = 0.14;
const WHEEL_CENTER_Y = 0.34;
const ARCH_RADIUS = 0.4;
const ARCH_HALF_ANGLE = Math.PI / 6;

export const CAR_DIMENSIONS = {
  halfWidth: 0.98,
  cabinHalfWidth: 0.7,
  wheelbaseHalf: 1.35,
  wheelRadius: 0.34,
  wheelWidth: 0.3,
  wheelTrackHalf: 0.84,
  wheelCenterY: WHEEL_CENTER_Y,
} as const;

const BEVEL = { bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3, curveSegments: 18 };

/** Extrudes a side profile across the car between two X planes. */
function extrudeAcross(shape: Shape, xFrom: number, xTo: number, bevel = BEVEL): BufferGeometry {
  const thickness = bevel.bevelEnabled ? bevel.bevelThickness : 0;
  const geometry = new ExtrudeGeometry(shape, { ...bevel, depth: xTo - xFrom - thickness * 2 });
  geometry.rotateY(-Math.PI / 2);
  geometry.translate(xTo - thickness, 0, 0);
  return geometry;
}

/** Places a flat side-plane shape at a given X (used for the side windows). */
function placeAcross(shape: Shape, x: number): BufferGeometry {
  const geometry = new ShapeGeometry(shape);
  geometry.rotateY(-Math.PI / 2);
  geometry.translate(x, 0, 0);
  return geometry;
}

function wheelArch(shape: Shape, centerZ: number, travellingForward: boolean) {
  const front = -ARCH_HALF_ANGLE;
  const rear = Math.PI + ARCH_HALF_ANGLE;
  if (travellingForward) shape.absarc(centerZ, WHEEL_CENTER_Y, ARCH_RADIUS, rear, front, true);
  else shape.absarc(centerZ, WHEEL_CENTER_Y, ARCH_RADIUS, front, rear, false);
}

function createNoseShape(): Shape {
  const shape = new Shape();
  shape.moveTo(0.95, GROUND_CLEARANCE);
  wheelArch(shape, CAR_DIMENSIONS.wheelbaseHalf, true);
  shape.lineTo(2.28, GROUND_CLEARANCE);
  shape.lineTo(2.39, 0.3);
  shape.lineTo(2.3, 0.5);
  shape.lineTo(0.95, 0.8);
  shape.closePath();
  return shape;
}

function createTailShape(): Shape {
  const shape = new Shape();
  shape.moveTo(-0.75, GROUND_CLEARANCE);
  wheelArch(shape, -CAR_DIMENSIONS.wheelbaseHalf, false);
  shape.lineTo(-2.25, GROUND_CLEARANCE);
  shape.lineTo(-2.39, 0.3);
  shape.lineTo(-2.39, 0.8);
  shape.lineTo(-2.25, 0.92);
  shape.lineTo(-1.6, 0.95);
  shape.lineTo(-0.75, 1.09);
  shape.closePath();
  return shape;
}

function createDoorShape(): Shape {
  const shape = new Shape();
  shape.moveTo(-0.75, GROUND_CLEARANCE);
  shape.lineTo(0.95, GROUND_CLEARANCE);
  shape.lineTo(0.95, 0.8);
  shape.lineTo(-0.75, 0.88);
  shape.closePath();
  return shape;
}

function createSideWindowShape(): Shape {
  const shape = new Shape();
  shape.moveTo(0.95, 0.8);
  shape.lineTo(0.05, 1.12);
  shape.lineTo(-0.75, 1.1);
  shape.lineTo(-0.75, 0.88);
  shape.closePath();
  return shape;
}

function createWindshield(): BufferGeometry {
  const bottomHalf = CAR_DIMENSIONS.cabinHalfWidth;
  const topHalf = 0.62;
  // prettier-ignore
  const vertices = [
    -bottomHalf, 0.8, 0.95,   bottomHalf, 0.8, 0.95,   topHalf, 1.12, 0.05,
    -bottomHalf, 0.8, 0.95,   topHalf, 1.12, 0.05,     -topHalf, 1.12, 0.05,
  ];
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}

export function createCarGeometries() {
  const { halfWidth, cabinHalfWidth, wheelRadius, wheelWidth } = CAR_DIMENSIONS;
  const door = createDoorShape();
  const sideWindow = createSideWindowShape();

  return {
    nose: extrudeAcross(createNoseShape(), -halfWidth, halfWidth),
    tail: extrudeAcross(createTailShape(), -halfWidth, halfWidth),
    doorLeft: extrudeAcross(door, cabinHalfWidth, halfWidth),
    doorRight: extrudeAcross(door, -halfWidth, -cabinHalfWidth),
    windowLeft: placeAcross(sideWindow, cabinHalfWidth),
    windowRight: placeAcross(sideWindow, -cabinHalfWidth),
    windshield: createWindshield(),
    roof: new BoxGeometry(1.28, 0.05, 0.82),
    floor: new BoxGeometry(cabinHalfWidth * 2, 0.12, 1.7),
    splitter: new BoxGeometry(1.9, 0.04, 0.3),
    diffuser: new BoxGeometry(1.7, 0.16, 0.12),
    lightBar: new BoxGeometry(1, 1, 1),
    // Open-ended tread plus ring sidewalls, so the rim, disc and caliper show through the wheel opening.
    tyre: new CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 36, 1, true).rotateZ(Math.PI / 2),
    sidewall: new RingGeometry(0.25, wheelRadius, 36).rotateY(Math.PI / 2),
    rimRing: new TorusGeometry(0.235, 0.028, 10, 36).rotateY(Math.PI / 2),
    spoke: new BoxGeometry(0.03, 0.22, 0.05),
    hub: new CylinderGeometry(0.055, 0.055, 0.05, 16).rotateZ(Math.PI / 2),
    brakeDisc: new CylinderGeometry(0.19, 0.19, 0.03, 32).rotateZ(Math.PI / 2),
    caliper: new BoxGeometry(0.06, 0.16, 0.08),
    seatCushion: new BoxGeometry(0.48, 0.12, 0.5),
    seatBack: new BoxGeometry(0.48, 0.66, 0.12),
    seatStripe: new BoxGeometry(0.12, 0.6, 0.01),
    dashboard: new BoxGeometry(1.36, 0.14, 0.45),
    tunnel: new BoxGeometry(0.24, 0.26, 1.2),
    steeringRim: new TorusGeometry(0.17, 0.022, 10, 40),
    steeringHub: new CylinderGeometry(0.05, 0.05, 0.06, 16).rotateX(Math.PI / 2),
    steeringColumn: new CylinderGeometry(0.025, 0.03, 0.32, 10),
    clusterScreen: new PlaneGeometry(0.36, 0.12),
    centerScreen: new PlaneGeometry(0.2, 0.13),
  };
}

export type CarGeometries = ReturnType<typeof createCarGeometries>;

export function disposeGeometries(geometries: Record<string, BufferGeometry>) {
  for (const geometry of Object.values(geometries)) geometry.dispose();
}
