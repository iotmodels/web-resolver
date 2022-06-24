export default {
  props: ['telemetry'],
  template: `
  [T] {{telemetry.displayName.en || telemetry.displayName}} '{{telemetry.name}}'
  `
}
