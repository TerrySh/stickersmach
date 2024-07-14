package expo.modules.mlben

import android.content.Context
import android.content.SharedPreferences
import androidx.core.os.bundleOf
import com.facebook.react.bridge.ReadableArray
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.google.mlkit.vision.digitalink.*
import expo.modules.kotlin.Promise
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


    AsyncFunction("recognizeInkAsync") { strokes: ReadableArray, promise: Promise ->
            val inkBuilder = Ink.builder()
            for (i in 0 until strokes.size()) {
              val stroke = strokes.getArray(i)
              val strokeBuilder = Ink.Stroke.builder()
              for (j in 0 until stroke!!.size()) {
                  val point = stroke.getArray(j)
                  val x = point!!.getDouble(0).toFloat()
                  val y = point.getDouble(1).toFloat()
                  val t = point.getDouble(2).toLong()
                  strokeBuilder.addPoint(Ink.Point.create(x, y, t))
              }
              inkBuilder.addStroke(strokeBuilder.build())
            }
            val ink = inkBuilder.build()

            val modelIdentifier = DigitalInkRecognitionModelIdentifier.fromLanguageTag("en-US")
            if (modelIdentifier == null) {
                promise.reject("MODEL_ERROR", "Model identifier could not be created", null)
                return@AsyncFunction
            }

            val model = DigitalInkRecognitionModel.builder(modelIdentifier).build()
            val recognizerOptions = DigitalInkRecognizerOptions.builder(model).build()
            val recognizer = DigitalInkRecognition.getClient(recognizerOptions)

            recognizer.recognize(ink)
                .addOnSuccessListener { result ->
                    val candidates = result.candidates
                    if (candidates.isNotEmpty()) {
                        promise.resolve(candidates[0].text)
                    } else {
                        promise.reject("NO_TEXT", "No text recognized", null)
                    }
                }
                .addOnFailureListener { e -> promise.reject("ERROR","error", e) }
    }


    AsyncFunction("recognizeInk") { strokes: ReadableArray, promise: Promise ->
        val inkBuilder = Ink.builder()
        for (i in 0 until strokes.size()) {
          val stroke = strokes.getArray(i)
          val strokeBuilder = Ink.Stroke.builder()
          for (j in 0 until stroke!!.size()) {
              val point = stroke.getArray(j)
              val x = point!!.getDouble(0).toFloat()
              val y = point.getDouble(1).toFloat()
              val t = point.getDouble(2).toLong()
              strokeBuilder.addPoint(Ink.Point.create(x, y, t))
          }
          inkBuilder.addStroke(strokeBuilder.build())
        }

        val ink = inkBuilder.build()

        val modelIdentifier = DigitalInkRecognitionModelIdentifier.fromLanguageTag("en-US")
        if (modelIdentifier == null) {
            promise.reject("MODEL_ERROR", "Model identifier could not be created", null)
            return@AsyncFunction
        }

        val model = DigitalInkRecognitionModel.builder(modelIdentifier).build()
        val recognizerOptions = DigitalInkRecognizerOptions.builder(model).build()
        val recognizer = DigitalInkRecognition.getClient(recognizerOptions)

        recognizer.recognize(ink)
            .addOnSuccessListener { result ->
                val candidates = result.candidates
                if (candidates.isNotEmpty()) {
                    promise.resolve(candidates[0].text)
                } else {
                    promise.reject("NO_TEXT", "No text recognized", null)
                }
            }
            .addOnFailureListener { e -> promise.reject("ERROR", "error", e) }
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
