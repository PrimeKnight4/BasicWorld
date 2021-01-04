class ControllerInput {
  constructor() {
    this._Init()
  }
  _Init() {
    this.key = []
    document.body.onkeydown = e => this._OnKeyDown(e)
    document.body.onkeyup = e => this._OnKeyUp(e)
  }
  _OnKeyDown(e) {
    this.key[e.key] = true
  }
  _OnKeyUp(e) {
    this.key[e.key] = false
  }
}