package expo.modules.mlben

import android.content.Context
import android.content.SharedPreferences
import androidx.core.os.bundleOf
import com.facebook.react.bridge.ReadableArray
import com.google.mlkit.common.model.DownloadConditions
import com.google.mlkit.common.model.RemoteModelManager
import com.google.mlkit.vision.digitalink.*
import expo.modules.kotlin.Promise
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

    AsyncFunction("recognizeInk") { strokes: ReadableArray, promise: Promise ->
      try {
        val inkBuilder = Ink.builder()
        for (i in 0 until strokes.size()) {
          val strokeArray = strokes.getArray(i)
          val strokeBuilder = Ink.Stroke.builder()
          for (j in 0 until strokeArray!!.size()) {
            val pointArray = strokeArray.getArray(j)
            val x = pointArray!!.getDouble(0).toFloat()
            val y = pointArray.getDouble(1).toFloat()
            val t = pointArray.getDouble(2).toLong()  // Convert the timestamp to Long
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
        val modelManager = RemoteModelManager.getInstance()

        // Check if the model is downloaded
        modelManager.isModelDownloaded(model)
          .addOnSuccessListener { isDownloaded ->
            if (!isDownloaded) {
              //Log.e("InkRecognition", "Model not downloaded")
              promise.reject("MODEL_NOT_DOWNLOADED", "Model not downloaded", null)
              // Download the model
              modelManager.download(model, DownloadConditions.Builder().build())
                .addOnSuccessListener {
                  //Log.d("InkRecognition", "Model downloaded successfully")
                  // Proceed with recognition
                  recognizeInk(ink, recognizer, promise)
                }
                .addOnFailureListener { e ->
                  //Log.e("InkRecognition", "Error downloading model", e)
                  promise.reject("DOWNLOAD_ERROR", e.message, e)
                }
            } else {
              //Log.d("InkRecognition", "Model is downloaded")
              // Proceed with recognition
              recognizeInk(ink, recognizer, promise)
            }
          }
          .addOnFailureListener { e ->
            //Log.e("InkRecognition", "Error checking model download status", e)
            promise.reject("ERROR", e.message, e)
          }
      } catch (e: Exception) {
        promise.reject("EXCEPTION", e.message, e)
      }
    }

  }

  val remoteModelManager: RemoteModelManager = RemoteModelManager.getInstance()

  private val context
  get() = requireNotNull(appContext.reactContext)
 
  private fun getPreferences(): SharedPreferences {
      return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }

  private fun recognizeInk(ink: Ink, recognizer: DigitalInkRecognizer, promise: Promise) {
    recognizer.recognize(ink)
      .addOnSuccessListener { result ->
        val candidates = result.candidates
        if (candidates.isNotEmpty()) {
          promise.resolve(candidates[0].text)
        } else {
          promise.reject("NO_TEXT", "No text recognized", null)
        }
      }
      .addOnFailureListener { e ->
        promise.reject("ERROR", e.message, e)
      }
  }
}

enum class Theme(val value: String) : Enumerable {
  LIGHT("light"),
  DARK("dark"),
  SYSTEM("system")
}
