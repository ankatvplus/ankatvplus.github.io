package com.example.bridgeaudiotv

import android.os.Bundle
import android.view.KeyEvent
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        webView = WebView(this)
        setContentView(webView)

        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.webViewClient = WebViewClient()
        webView.loadUrl("https://app.bridge.audio")
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        when(keyCode) {
            KeyEvent.KEYCODE_DPAD_UP -> webView.scrollBy(0, -150)
            KeyEvent.KEYCODE_DPAD_DOWN -> webView.scrollBy(0, 150)
            KeyEvent.KEYCODE_DPAD_LEFT -> webView.scrollBy(-150, 0)
            KeyEvent.KEYCODE_DPAD_RIGHT -> webView.scrollBy(150, 0)
            KeyEvent.KEYCODE_DPAD_CENTER,
            KeyEvent.KEYCODE_ENTER -> webView.requestFocus()
        }
        return super.onKeyDown(keyCode, event)
    }
}
