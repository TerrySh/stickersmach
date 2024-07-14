import ExpoModulesCore

public class MlBenModule: Module {

  public func definition() -> ModuleDefinition {

    Name("MlBen")

    Events("onChangeTheme")

    Function("setTheme") { (theme: Theme) -> Void in
      UserDefaults.standard.set(theme.rawValue, forKey: "theme")
      sendEvent("onChangeTheme", [
        "theme": theme
      ])
    }

    Function("getTheme") { () -> String in
      UserDefaults.standard.string(forKey: "theme") ?? Theme.system.rawValue
    }

    // AsyncFunction("recognizeInk") { (strokes: String) in

    // }
  }

  enum Theme: String, Enumerable {
    case light
    case dark
    case system
  }
}
