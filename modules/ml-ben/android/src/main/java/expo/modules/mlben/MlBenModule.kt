package expo.modules.mlben

import android.content.Context
import android.content.SharedPreferences
import androidx.core.os.bundleOf
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.types.Enumerable

class MlBenModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MlBen")

    Events("onChangeTheme")

    Function("setTheme") { theme: String ->
      getPreferences().edit().putString("theme", theme).commit()
      this@MlBenModule.sendEvent("onChangeTheme", bundleOf("theme" to theme))
    }

    Function("getTheme") {
      return@Function getPreferences().getString("theme", "system")
    }
  }

  private val context
  get() = requireNotNull(appContext.reactContext)
 
  private fun getPreferences(): SharedPreferences {
      return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }
}

enum class Theme(val value: String) : Enumerable {
  LIGHT("light"),
  DARK("dark"),
  SYSTEM("system")
}
