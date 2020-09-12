class Kinect {
  static instance = new Kinect()

  static HOST_NAME = "io.lit3d.kinect"
  static RECONECT_TIMEOUT = 5000
  static EVENT_NAME = "depth"

  #depth = null

  constructor() {
    if (this.instance) { return this.instance }
    setTimeout(this.connect, Kinect.RECONECT_TIMEOUT)
  }

  connect = () => {
    this.#depth = null
    try {
      this.#depth = chrome.runtime.connectNative(Kinect.HOST_NAME)
    } catch (err) {
      console.error(err)
      setTimeout(this.connect, Kinect.RECONECT_TIMEOUT)
      return
    }

    this.#depth.onMessage.addListener(this.onDepthMessage)
    this.#depth.onDisconnect.addListener(this.onDisconnected)
  }

  onDepthMessage = data => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      tabs.forEach(({id}) => {
        chrome.tabs.sendMessage(id, data)
      })
    })
  }

  onDepthDisconnected = () => setTimeout(this.connect, Kinect.RECONECT_TIMEOUT)
}
