package com.example.moneyinthebank

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    private var rewardedAd: RewardedAd? = null
    private lateinit var bannerAdView: AdView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        MobileAds.initialize(this) {}

        bannerAdView = findViewById(R.id.bannerAdView)
        val bannerRequest = AdRequest.Builder().build()
        bannerAdView.loadAd(bannerRequest)

        val adRequest = AdRequest.Builder().build()
        RewardedAd.load(this, "ca-app-pub-6394894143909202/9244546846", adRequest,
            object : RewardedAdLoadCallback() {
                override fun onAdLoaded(ad: RewardedAd) { rewardedAd = ad }
                override fun onAdFailedToLoad(error: com.google.android.gms.ads.LoadAdError) { rewardedAd = null }
            }
        )

        webView = findViewById(R.id.webView)
        webView.webViewClient = WebViewClient()
        webView.settings.javaScriptEnabled = true
        webView.loadUrl("https://samuelfloki001.github.io/Money_In_The_Bank-_app")
    }

    private fun showRewardedAd() {
        rewardedAd?.show(this) { webView.reload() }
    }
}