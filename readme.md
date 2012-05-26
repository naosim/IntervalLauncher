特徴：
このアプリは、指定したアプリ(.exeとか.batとか)を
定期的に実行することが出来ます。

CI環境を構築して定期的に何かを実行したいけど
jenkinsサーバたてるのは面倒。クーロンにするのも面倒。
って人に使ってもらいたいと思います。

※最終的にはAdobeAIRのアプリになる予定です。

Adobe AIR 開発メモ

##SDKにパスを通す。
export PATH=$PATH:/Applications/AdobeAIRSDK/bin

##実行する
adl IntervalLauncher-app.xml

##リリース方法
自己署名入り証明書とキーのペアの生成
adt -certificate -cn SelfSigned 1024-RSA sampleCert.pfx samplePassword

AIR インストールファイルの作成
adt -package -storetype pkcs12 -keystore sampleCert.pfx IntervalLauncher.air IntervalLauncher-app.xml src

→IntervalLauncher.airを公開